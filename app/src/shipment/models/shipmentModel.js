const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Shipment = sequelize.define(
        "shipment", {
            shipment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            shipment_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zip_code: {
                type: DataTypes.STRING,
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

    return Shipment;
};
