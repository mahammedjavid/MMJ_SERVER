"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const AddressSchema = (sequelize) => {
    return sequelize.define("address", {
        address_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        add_type: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        add_one: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        add_two: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        pincode: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });
};
exports.default = AddressSchema;
