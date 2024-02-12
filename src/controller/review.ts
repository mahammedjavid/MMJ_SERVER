import { NextFunction, Response, Request, Router } from "express";
import { _createReviewService, _getAllReviewsByProductIDService, _activatDeactivateReviewsService } from "../services/reviews";
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken } from "../helper/jwtToken";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/').get(getAllReviewsByProductId).post(upload.array("review_image"), verifyAccessToken, createReview);
router.route('/manage-review').post(verifyAccessToken, _activatDeactivateReviews)

function createReview(req: Request, res: Response, next: NextFunction) {
    _createReviewService(req)
        .then((result: any) => {
            res.json(
                apiResponse({
                    data: result.data,
                    status: true,
                    message: result.message,
                })
            );
        })
        .catch((err: any) => {
            res.status(500).json(
                apiResponse({
                    data: "",
                    status: false,
                    message: err.message,
                })
            );
        });
}

function getAllReviewsByProductId(req: Request, res: Response, next: NextFunction) {
    _getAllReviewsByProductIDService(req)
        .then((result: any) => {
            res.json(
                apiResponse({
                    data: result.data,
                    status: true,
                    message: result.message,
                })
            );
        })
        .catch((err: Error) => {
            res.status(500).json(
                apiResponse({
                    data: "",
                    status: false,
                    message: err.message,
                })
            );
        });
}
export function _activatDeactivateReviews(req: Request, res: Response, next: NextFunction) {
    _activatDeactivateReviewsService(req)
        .then((result: any) => {
            res.json(
                apiResponse({
                    data: result.data,
                    status: true,
                    message: result.message,
                })
            );
        })
        .catch((err: any) => {
            res.status(500).json(
                apiResponse({
                    data: "",
                    status: false,
                    message: err.message,
                })
            );
        });
}

export default router;
