import { Request } from "express";
import { UserTable, reviewsTable, ProductTable } from "../relation/index";
import { validatePayload } from "../helper/payloadValidation";

async function _createReviewService(req: Request) {
  try {
    const { customer_id, product_id, review_message, review_images , review_rate } = req.body;

    const requiredFields = ["customer_id", "product_id", "review_message" , "review_rate"];
    validatePayload(req.body, requiredFields);

    const user = await UserTable.findByPk(customer_id);
    if (!user) {
      throw new Error("User not found");
    }

    if(parseFloat(review_rate) < 0 || parseFloat(review_rate) > 5){
      throw new Error("Review rating is not valid");
    }

    const product = await ProductTable.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    const review = await reviewsTable.create({
      customer_id,
      product_id,
      review_message,
      review_rate,
      review_images: Array.isArray(review_images) ? review_images ?.join(",") : review_images,
    });

    return {
      data: review,
      message: "Review created successfully",
    };
  } catch (error) {
    console.error("Error in _createReviewService:", error);
    throw error;
  }
}

async function _getAllReviewsByProductIDService(req: Request) {
  try {
    const { product_id } = req.body;
    const requiredFields = ["product_id"];
    validatePayload(req.body, requiredFields);

    const product = await ProductTable.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }
    const reviews = await reviewsTable.findAll({
      where: { product_id , isActive : true },
      include: [UserTable],
    });
    return {
      data: reviews,
      message: "Reviews retrieved successfully",
    };
  } catch (error) {
    console.error("Error in _getAllReviewsService:", error);
    throw error;
  }
}

async function _activatDeactivateReviewsService(req: Request) {
  const {
    review_id,
    status,
  } = req.body;

  const requiredFields = [
    "review_id",
    "status"
  ];
  validatePayload(req.body, requiredFields);

  if (status != 'true' && status != 'false') throw new Error("Invalid Input for status")

  try {
    const review: any = await reviewsTable.findByPk(review_id);
    if (!review) {
      throw new Error("Review not found");
    }

    review.isActive = status;
    await review.save();

    return {
      message: "Review" + " " + (status === 'true' ? "Activated" : "Deleted") + " " + "Successfully"
    };
  } catch (error) {
    console.error("Error in _activatDeactivateReviewsService:", error);
    throw error;
  }
}

export {
  _createReviewService,
  _getAllReviewsByProductIDService,
  _activatDeactivateReviewsService
};
