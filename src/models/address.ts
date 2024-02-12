import { DataTypes, Sequelize } from "sequelize";

const AddressSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "address", {
            address_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            add_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            add_one: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            add_two: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            pincode: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        }, {
            timestamps: true,
        }
    )
};

export default AddressSchema;
