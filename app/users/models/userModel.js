const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "customer_details", {
            customer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            mobile_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            first_name : {
                type: DataTypes.STRING,
                allowNull: true
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otp: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            timestamps: true,
        }
    );

    // Define associations here, if needed
    // User.associate = (models) => {
        // Define associations here
    // };

    return User;
};
