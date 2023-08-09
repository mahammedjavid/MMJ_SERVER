const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        "payment", {
            payment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            payment_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: false
            },
            amount: {
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

    return Payment;
};
