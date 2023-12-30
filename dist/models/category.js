"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const CategorySchema = (sequelize) => {
    return sequelize.define("category", {
        category_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        category_image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
    });
};
exports.default = CategorySchema;
