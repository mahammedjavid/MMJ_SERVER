const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "order", {
            order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            total_price: {
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

    return Order;
};
