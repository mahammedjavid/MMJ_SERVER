import { DataTypes, Sequelize, Model } from "sequelize";

const OrderItemSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "orderItem",
        {
            order_item_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull : false,
                defaultValue: DataTypes.UUIDV1,
            },
            quantity: {
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
