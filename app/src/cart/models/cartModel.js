const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const cartTable = sequelize.define(
        "cart", {
            cart_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            timestamps: true,
        }
    );

    // Define associations here, if needed
    // User.associate = (models) => {
        // Define associations here
    // };

    return cartTable;
};
