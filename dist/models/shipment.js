"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const ShipmentSchema = (sequelize) => {
    return sequelize.define("shipment", {
        shipment_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shipment_date: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        zip_code: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
    });
};
exports.default = ShipmentSchema;
