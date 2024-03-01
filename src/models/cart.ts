import { DataTypes, Sequelize, Model } from "sequelize";

const CartSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "cart", {
            cart_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull : false,
                defaultValue: DataTypes.UUIDV1,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            size :{
                type: DataTypes.STRING,
                allowNull: false,
            } 
        }, {
            timestamps: true,
        }
    );
};

export default CartSchema;
