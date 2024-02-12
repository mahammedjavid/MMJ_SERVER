import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { _getCartListService, _createCartItemService ,_removeProductFromCartService } from "../services/cart";
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken } from "../helper/jwtToken";

const router = Router();

router
  .route("/")
  .get(verifyAccessToken,getAllCartItems)
  .post(verifyAccessToken, addToCart)  //passport.authenticate("jwt", { session: false })
router.route("/:customer_id/:product_id").delete(verifyAccessToken,removeProductFromCart);

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
      res.status(500).json(
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
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
export function removeProductFromCart(req: Request, res: Response, next: NextFunction) {
  _removeProductFromCartService(req)
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
