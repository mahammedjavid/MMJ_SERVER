import { DataTypes, Sequelize, Model } from "sequelize";

const UserSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "customer_details", {
            customer_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true,
            },
            mobile_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dob : {
                type: DataTypes.DATE,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otp: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        }, {
            timestamps: true,
        }
    );
};

export default UserSchema;
