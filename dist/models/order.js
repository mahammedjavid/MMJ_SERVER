"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const OrderSchema = (sequelize) => {
    return sequelize.define("order", {
        order_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
        total_price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};
exports.default = OrderSchema;
