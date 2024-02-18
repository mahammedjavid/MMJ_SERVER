import { NextFunction, Request, Response, Router } from "express";
import { verifyAccessToken } from "../helper/jwtToken";
import { _generateHashForPaymentService } from "../services/payment";
import apiResponse from "../helper/apiResponce";

const router = Router();

router.route("/")
    .post(verifyAccessToken, generateHashForPayment);

function generateHashForPayment(req: Request, res: Response, next: NextFunction) {
    _generateHashForPaymentService(req,res)
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

export default router;
