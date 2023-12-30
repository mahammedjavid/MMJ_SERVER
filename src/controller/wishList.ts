import { NextFunction, Response, Request, Router } from "express";
import passport from 'passport';
import { _getWishListListService, _createWishListItemService } from "../services/wishList";
import apiResponse from "../helper/apiResponce";

const router = Router();

router.route('/').get(getAllWishListItems).post(passport.authenticate('jwt', { session: false }), addToWishList);

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
            res.json(
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
            res.json(
                apiResponse({
                    data: "",
                    status: false,
                    message: err.message,
                })
            );
        });
}

export default router;
