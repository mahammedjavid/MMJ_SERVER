import { DataTypes, Sequelize, Model } from "sequelize";


const ShipmentSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "shipment", {
            shipment_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull : false,
                defaultValue: DataTypes.UUIDV1,
            },
            shipment_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            zip_code: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            timestamps: true,
        }
    );
};

export default ShipmentSchema;
