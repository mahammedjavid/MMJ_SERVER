import { Request, Response, NextFunction, Router } from "express";
import { createOrderService, _getOrderListService, _updateOrderStatusService } from "../services/order";
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken } from "../helper/jwtToken";

const router = Router();

router.route("/")
    .post(verifyAccessToken, createOrder).put(verifyAccessToken, updateOrderStatus)

router.route("/:customer_id")
    .get(verifyAccessToken, getAllOrder)

function createOrder(req: Request, res: Response, next: NextFunction) {
    createOrderService(req)
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

function getAllOrder(req: Request, res: Response, next: NextFunction) {
    _getOrderListService(req)
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

function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    _updateOrderStatusService(req)
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

