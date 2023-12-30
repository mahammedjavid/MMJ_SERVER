import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { _getCartListService, _createCartItemService } from "../services/cart";
import apiResponse from "../helper/apiResponce";

const router = Router();

router
  .route("/")
  .get(getAllCartItems)
  .post(passport.authenticate("jwt", { session: false }), addToCart);

function addToCart(req: Request, res: Response, next: NextFunction) {
  _createCartItemService(req)
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

function getAllCartItems(req: Request, res: Response, next: NextFunction) {
  _getCartListService(req)
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

export default router;
