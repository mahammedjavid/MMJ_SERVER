const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "product", {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            SKU: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            stock: {
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

    return Product;
};
