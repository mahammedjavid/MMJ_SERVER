"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const PaymentSchema = (sequelize) => {
    return sequelize.define("payment", {
        payment_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        payment_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        payment_method: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
    ;
};
exports.default = PaymentSchema;
