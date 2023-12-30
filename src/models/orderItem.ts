import { DataTypes, Sequelize, Model } from "sequelize";

const OrderItemSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "order-item",
        {
            order_item_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: true,
        }
    );
};

export default OrderItemSchema;
