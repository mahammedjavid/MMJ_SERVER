import { DataTypes, Sequelize, Model } from "sequelize";

const OrderSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "order", {
            order_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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
