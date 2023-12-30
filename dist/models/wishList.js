"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const WishlistSchema = (sequelize) => {
    return sequelize.define("wishlist", {
        wishlist_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    }, {
        timestamps: true,
    });
};
exports.default = WishlistSchema;
