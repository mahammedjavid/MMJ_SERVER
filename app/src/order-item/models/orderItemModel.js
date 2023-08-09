const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
        "order-item", {
            order_item_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            timestamps: true,
        }
    );

    // Define associations here, if needed
    // User.associate = (models) => {
        // Define associations here
    // };

    return OrderItem;
};
