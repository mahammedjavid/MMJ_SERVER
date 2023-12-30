"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserSchema = (sequelize) => {
    return sequelize.define("customer_details", {
        customer_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mobile_number: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        otp: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        is_deleted: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        timestamps: true,
    });
};
exports.default = UserSchema;
