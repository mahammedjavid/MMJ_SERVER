import { DataTypes, Sequelize, Model } from "sequelize";

const CartSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "cart", {
            cart_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
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
