import { DataTypes, Sequelize, Model } from "sequelize";

const OrderItemSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "order-item",
        {
            order_item_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
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
