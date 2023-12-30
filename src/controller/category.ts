import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import { _getcategoryListService, _createCategoryService } from "../services/category";
import apiResponse from "../helper/apiResponce";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .route("/")
  .get(getAllCategory)
  .post(upload.single("category_image"), createCategory);

async function getAllCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const result: any = await _getcategoryListService();
    res.json(
      apiResponse({
        data: result.data,
        status: true,
        message: result.message,
      })
    );
  } catch (err: any) {
    res.json(
      apiResponse({
        data: "",
        status: false,
        message: err.message,
      })
    );
  }
}

async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const result: any = await _createCategoryService(req);
    console.log(result);
    res.json(
      apiResponse({
        data: result.data,
        status: true,
        message: result.message,
      })
    );
  } catch (err: any) {
    res.json(
      apiResponse({
        data: "",
        status: false,
        message: err.message,
      })
    );
  }
}

export default router;
