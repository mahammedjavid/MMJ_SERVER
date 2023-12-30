import { DataTypes, Sequelize, Model } from "sequelize";

const CartSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "cart", {
            cart_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }, {
            timestamps: true,
        }
    );
};

export default CartSchema;
