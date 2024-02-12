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
      where: { product_id },
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

async function _deleteReviewService(req: Request) {
  try {
    const { review_id } = req.params;
    if (!review_id) {
      throw new Error("Review ID is required");
    }
    const removedReview = await reviewsTable.destroy({
      where: { review_id },
    });

    if (!removedReview) {
      throw new Error("Review not found");
    }
    return {
      data: removedReview,
      message: "Review removed successfully",
    };
  } catch (error) {
    console.error("Error in _deleteReviewService:", error);
    throw error;
  }
}

export {
  _createReviewService,
  _getAllReviewsByProductIDService,
  _deleteReviewService
};
