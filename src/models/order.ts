import { DataTypes, Sequelize, Model } from "sequelize";

const OrderSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "order", {
            order_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            timestamps: true,
        }
    );
};

export default OrderSchema;
