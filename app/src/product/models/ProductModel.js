const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "product", {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            product_images: {
                type: DataTypes.JSON,
                allowNull : true
            },
            SKU: { // it is a number (usually eight alphanumeric digits) that retailers assign to products to keep track of stock levels internally. If a product has different colors and sizes, each variation has a unique SKU number.
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
            category: {
                type: DataTypes.JSON,
                allowNull: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true, 
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
