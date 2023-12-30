"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CartSchema = (sequelize) => {
    return sequelize.define("cart", {
        cart_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: true,
    });
};
exports.default = CartSchema;
