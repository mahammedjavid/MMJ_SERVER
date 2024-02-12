import { DataTypes, Sequelize, Model } from "sequelize";

const PaymentSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "payment", {
            payment_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull : false,
                defaultValue: DataTypes.UUIDV1,
            },
            payment_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            payment_method: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            timestamps: true,
        }
    );;
};

export default PaymentSchema;
