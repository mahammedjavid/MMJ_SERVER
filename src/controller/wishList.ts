import { NextFunction, Response, Request, Router } from "express";
import passport from 'passport';
import { _getWishListListService, _createWishListItemService, _removeProductFromWishListService } from "../services/wishList";
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken } from "../helper/jwtToken";

const router = Router();

router.route('/').post(verifyAccessToken, addToWishList); // passport.authenticate('jwt', { session: false })
router.route('/:customer_id/:product_id').delete(verifyAccessToken, removeProductFromWishList).get(verifyAccessToken, getAllWishListItems)

function addToWishList(req: Request, res: Response, next: NextFunction) {
    _createWishListItemService(req)
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

function getAllWishListItems(req: Request, res: Response, next: NextFunction) {
    _getWishListListService(req)
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
export function removeProductFromWishList(req: Request, res: Response, next: NextFunction) {
    _removeProductFromWishListService(req)
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
