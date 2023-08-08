// Controller 
const router = require('express').Router();
// const router = Router();
const apiResponse = require("../../helper/apiResponce");
const { _createCustomerService,
} = require('../services/userService');
// const multer = require('multer');
// const uploadExcel = multer({ dest: 'uploads/' }).single('file');

router.post('/login', createCustomer);


function createCustomer(req, res, next) {
    console.log('hi')
    console.log(req)
    _createCustomerService(req)
        .then((user) =>
            res.json(
                // apiResponse(
                    {
                data: user,
                status: "OK",
                message: "Created Successfully!",
            }
            // )
            ))
        .catch((err) => next(err));
}
module.exports = router;

// function getBankAccountDetailsByUserId(req, res, next) {
//     _getBankAccountDetailsByUserId(req)
//         .then((user) =>
//             res.json(apiResponse({
//                 data: user,
//                 status: "OK",
//                 message: "Data Fetched Successfully!",
//             })))
//         .catch((err) => next(err));
// }

// function getBankAccountDetailsById(req, res, next) {
//     _getBankAccountDetailsById(req)
//         .then((user) =>
//             res.json(apiResponse({
//                 data: user,
//                 status: "OK",
//                 message: "Data Fetched Successfully!",
//             })))
//         .catch((err) => next(err));
// }

// function updateBankDetails(req, res, next) {
//     _updateBankDetails(req)
//         .then((user) =>
//             res.json(apiResponse({
//                 data: user,
//                 status: "OK",
//                 message: "Data Updated Successfully!",
//             })))
//         .catch((err) => next(err));
// }


// function uploadUserData(req, res, next) {
//     _uploadUserData(req)
//         .then((user) =>
//             res.json(apiResponse({
//                 data: user,
//                 status: "OK",
//                 message: "Created Successfully!",
//             })))
//         .catch((err) => next(err));
// }

// function deleteBankDetails(req, res, next) {
//     _deleteBankDetails(req)
//         .then((user) =>
//             res.json(apiResponse({
//                 data: user,
//                 status: "OK",
//                 message: "Deleted Successfully!",
//             })))
//         .catch((err) => next(err));
// }