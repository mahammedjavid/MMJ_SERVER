"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ProductSchema = (sequelize) => {
    return sequelize.define("product", {
        product_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        product_other_info: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        product_images: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        },
        SKU: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        product_description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        size: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};
exports.default = ProductSchema;
