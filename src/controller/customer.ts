import { NextFunction, Request, Response, Router } from "express";
import passport from 'passport';
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken, verifyRefreshToken } from '../helper/jwtToken'
import { _createCustomerService , _getAllUserListervice , verifyOTPService, _updateCustomerInfoService , _generateNewRefreshTokenService, _resendOtpService , _logOutService } from '../services/customer'
import { passPOrtAuth } from "../helper/passportAuth";

const router = Router();
// passPOrtAuth(passport)
router.route("/").get(verifyAccessToken , getAllUserList) //passport.authenticate('jwt', { session: false })
router.route('/:id').put(verifyAccessToken,updateCustomerInfo);

router.post("/login", createCustomer);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post('/refresh' , verifyRefreshToken ,getNewTokens)
router.get('/logout',verifyAccessToken ,logOut)

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
      res.status(500).json(
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
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}
async function resendOTP(req: Request, res: Response, next: NextFunction) {
  _resendOtpService(req)
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
      res.status(500).json(
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
      res.status(500).json(
        apiResponse({
          data: "",
          status: false,
          message: err.message,
        })
      );
    });
}

function updateCustomerInfo(req:Request , res: Response , next : NextFunction){
  _updateCustomerInfoService(req)
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
    res.status(500).status(500).json(
      apiResponse({
        data: "",
        status: false,
        message: err.message,
      })
    );
  });
}

function getNewTokens(req:Request , res: Response , next : NextFunction){
  _generateNewRefreshTokenService(req)
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
    res.status(500).status(500).json(
      apiResponse({
        data: "",
        status: false,
        message: err.message,
      })
    );
  });
}

function logOut(req:Request , res: Response , next : NextFunction){
  _logOutService(req)
  .then((result: any) =>
    res.json(
      apiResponse({
        data: "",
        status: "OK",
        message: result.message,
      })
    )
  )
  .catch((err: Error) => {
    res.status(500).status(500).json(
      apiResponse({
        data: "",
        status: false,
        message: err.message,
      })
    );
  });
}

export default router;
