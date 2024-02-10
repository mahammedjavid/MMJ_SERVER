import { CategoryTable } from '../relation/index';
import { validatePayload } from '../helper/payloadValidation';
import { uploadToS3 } from '../helper/aws.s3-upload'; // Import the uploadToS3 function from its actual path

async function _getcategoryListService() {
  try {
    const category = await CategoryTable.findAll();
    return {
      data: category,
      message: 'Category list retrieved successfully',
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

async function _createCategoryService(req: any) {
  try {
    const { category_name }: { category_name: string } = req.body;
    const requiredFields = ['category_name'];
    validatePayload(req.body, requiredFields);

    let existingCategory = await CategoryTable.findOne({
    where: { category_name },
    });

    if (existingCategory) {
      throw new Error('Category Already Exists');
    }

    // For single image upload
    // let uploadedImage = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

    let uploadedImage = req?.file?.originalname
    // Create the category in the database
    const newCategory = await CategoryTable.create({
      category_image: uploadedImage,
      category_name,
    });

    return {
      data: newCategory,
      message: 'Category Created successfully',
    };
  } catch (error) {
    console.error('Error in _createCategoryService:', error);
    throw error;
  }
}

export  {
  _getcategoryListService,
  _createCategoryService,
};
