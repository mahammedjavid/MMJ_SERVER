const router = require("express").Router();
const { _getBulkResponceService } = require("../services/bulkUploadService");
const apiResponse = require("../../../helper/apiResponce");
router.route('/').get(getAllBulkresponce);
function getAllBulkresponce(req, res, next) {
    _getBulkResponceService(req)
        .then((result) => {
            res.json(
                apiResponse({
                    data: result.data,
                    status: true,
                    message: result.message,
                })
            );
        })
        .catch((err) => {
            res.json(
                apiResponse({
                    data: "",
                    status: false,
                    message: err.message,
                })
            );
        });
}
module.exports = router;
