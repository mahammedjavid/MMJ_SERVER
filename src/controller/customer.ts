import { NextFunction, Request, Response, Router } from "express";
import passport from 'passport';
import apiResponse from "../helper/apiResponce";
import {
  _createCustomerService,
  verifyOTPService,
  _getAllUserListervice
} from "../services/customer";
import { passPOrtAuth } from "../helper/passportAuth";

const router = Router();
passPOrtAuth(passport)
router.route("/").get(passport.authenticate('jwt', { session: false }) , getAllUserList);
router.post("/login", createCustomer);
router.post("/verify-otp", verifyOTP);

function createCustomer(req: Request, res: Response, next: NextFunction) {
  _createCustomerService(req)
    .then((result: any) =>
      res.json(
        apiResponse({
          data: result.data,
          status: "OK",
          message: result.message,
        })
      )
    )
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

async function verifyOTP(req: Request, res: Response, next: NextFunction) {
  verifyOTPService(req)
    .then((result: any) =>
      res.json(
        apiResponse({
          data: result.data,
          status: "OK",
          message: result.message,
          access_token: result.access_token,
          refresh_token: result.refresh_token
        })
      )
    )
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

function getAllUserList(req: Request, res: Response, next: NextFunction) {
  _getAllUserListervice()
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
