import { DataTypes, Sequelize, Model } from "sequelize";
const ProductSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "product", {
            product_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            product_title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            product_other_info: {
                type: DataTypes.STRING,
                allowNull: true
            },
            product_images: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            SKU: { // it is as number (usually eight alphanumeric digits) that retailers assign to products to keep track of stock levels internally. If a product has different colors and sizes, each variation has a unique SKU number.
                type: DataTypes.STRING,
                allowNull: false,
                unique : true
            },
            product_description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            size: {
                type: DataTypes.TEXT,
                allowNull: false,
            }, 
            offer_price: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        }, {
            timestamps: true,
        }
    );
};

export default ProductSchema;
