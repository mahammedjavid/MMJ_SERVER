import { NextFunction, Request, Response, Router } from "express";
import { _getBulkResponceService } from "../services/bulkUploadResponce";
import apiResponse from "../helper/apiResponce";
import { verifyAccessToken } from "../helper/jwtToken";

const router = Router();

router.route("/").get(verifyAccessToken,getAllBulkresponce);

function getAllBulkresponce(req: Request, res: Response, next: NextFunction) {
  _getBulkResponceService()
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
