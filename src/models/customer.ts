import { DataTypes, Sequelize, Model } from "sequelize";

const UserSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "customer_details", {
            customer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            mobile_number: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
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
