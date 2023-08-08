// Service
// const { BankAccountDetailsTable, userTable, UnitsTable, userUnitMap, customerAuthTable, LocationTable, ChronicIllnessTable, UserStaffTable, DepartmentTable } = require('../../../models/index');
const { userTable } = require('../models/userModel')
const Sequelize = require('sequelize');
// const Op = Sequelize.Op;
// const xlsx = require('xlsx');
// const fs = require('fs');
// const fileExportFunction = require('../../../documents/file_exports');

async function _createCustomerService(req) {
    console.log('hi')
    console.log(req)
//   req.body.created_by = req.user.staff_id;
  const { mobile_number, first_name, last_name} = req.body;

  if (!mobile_number) {
    throw new Error("Please provide mobile number!");
  }
  const user = await userTable.findByPk(customer_id);
  if (user) {
    throw new Error("User already exist");
  }
  return user

}

// async function _getBankAccountDetailsByUserId(req) {
//   const { user_id } = req.params;
//   return await BankAccountDetailsTable.findAll({
//     where: { user_id, is_deleted: false },
//     include: [
//       {
//         model: UserStaffTable,
//         as: 'createdby',
//         attributes: ["first_name", "last_name", "staff_number"],
//         include: [
//           { model: DepartmentTable },
//         ]
//       },
//       {
//         model: UnitsTable,
//         where: { is_deleted: false }
//       },
//       {
//         model: userTable,
//         where: { is_deleted: false }
//       }

//     ],
//     order: [["createdAt", "DESC"]],
//   })
// }

// async function _getBankAccountDetailsById(req) {
//   return await BankAccountDetailsTable.findOne({
//     where: { bank_account_id: req.params.id, is_deleted: false },
//     include: [
//       { model: UserStaffTable, as: 'createdby' }
//     ]
//   });
// }

module.exports = {
    _createCustomerService,
}