import { NextFunction, Request, Response, Router } from "express";
import { verifyAccessToken } from "../helper/jwtToken";
import { _createAddressService, _getAddressListService, _updateAddressService, _deleteAddressService } from "../services/address";
import apiResponse from "../helper/apiResponce";

const router = Router();

router.route("/")
    .post(verifyAccessToken, addAddress);

router.route("/:address_id")
    .put(verifyAccessToken, updateAddress)
    .delete(verifyAccessToken, deleteAddress);
router.route("/:customer_id")
    .get(verifyAccessToken, getAllAddresses)

function addAddress(req: Request, res: Response, next: NextFunction) {
    _createAddressService(req)
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

function getAllAddresses(req: Request, res: Response, next: NextFunction) {
    _getAddressListService(req)
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

function updateAddress(req: Request, res: Response, next: NextFunction) {
    _updateAddressService(req)
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

function deleteAddress(req: Request, res: Response, next: NextFunction) {
    _deleteAddressService(req)
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
