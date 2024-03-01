import { NextFunction, Request, Response, Router } from "express";
import { verifyAccessToken } from "../helper/jwtToken";
import { _generateHashForPaymentService, _handleFailedPaymentService, _handleSuccessPaymentService, _paymentService } from "../services/payment";
import apiResponse from "../helper/apiResponce";

const router = Router();

router.route("/")
    .post(verifyAccessToken, payment);
router.route("/generate-hash")
    .post(verifyAccessToken, generateHashForPayment);
router.route("/success")
    .post(verifyAccessToken, handleSuccessPayment);
router.route("/failure")
    .post(verifyAccessToken, handleFailedPayment);


function generateHashForPayment(req: Request, res: Response, next: NextFunction) {
    _generateHashForPaymentService(req, res)
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
function payment(req: Request, res: Response, next: NextFunction) {
    _paymentService(req, res)
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
function handleSuccessPayment(req: Request, res: Response, next: NextFunction) {
    _handleSuccessPaymentService(req, res)
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
function handleFailedPayment(req: Request, res: Response, next: NextFunction) {
    _handleFailedPaymentService(req, res)
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
