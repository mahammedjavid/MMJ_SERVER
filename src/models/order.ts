import { DataTypes, Sequelize } from "sequelize";
import OrderItemSchema from "./orderItem";

const OrderSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "order", {
            order_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull : false,
                defaultValue: DataTypes.UUIDV1,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status : {
                type : DataTypes.STRING,
                allowNull : false,
                defaultValue : 'Pending',
            }
        }, {
            timestamps: true,
        }
    );
};

export default OrderSchema;
