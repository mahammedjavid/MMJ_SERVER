// Model
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "customer_details", {
            customer_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            mobile_number: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            first_name : {
                type: Sequelize.STRING,
                allowNull: true
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            otp: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            //Foreign Keys
            // user_id: {
            //     type: Sequelize.INTEGER,
            //     references: userTable,
            //     referencesKey: "user_id",
            // },

            // created_by: {
            //     type: Sequelize.INTEGER,
            //     defaultValue : new Date()
            //     references: UserStaffTable,
            //     referencesKey: "staff_id",
            // },
            // updated_by: {
            //     type: Sequelize.INTEGER,
            //     defaultValue : new Date()
            //     references: UserStaffTable,
            //     referencesKey: "staff_id",
            // }
        }, {
            timestamps: true,
            // indexes: [{
            //     fields: ["bank_account_id", 'user_id'],
            // }, ],
        }
    );
};