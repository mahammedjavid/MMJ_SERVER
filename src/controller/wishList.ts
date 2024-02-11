import { NextFunction, Response, Request, Router } from "express";
import passport from 'passport';
import { _getWishListListService, _createWishListItemService } from "../services/wishList";
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken } from "../helper/jwtToken";

const router = Router();

router.route('/').get(getAllWishListItems).post(verifyAccessToken, addToWishList); // passport.authenticate('jwt', { session: false })

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

export default router;
