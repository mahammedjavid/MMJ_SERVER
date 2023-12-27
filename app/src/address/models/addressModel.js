const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const address = sequelize.define(
        "address", {
            address_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            add_type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            add_one: {
                type: DataTypes.STRING,
                allowNull: false
            },
            add_two: {
                type: DataTypes.STRING,
                allowNull: true
            },
            state: {
                type: DataTypes.STRING,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            pincode: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
        }
    );

    return address;
};
