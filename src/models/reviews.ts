import { DataTypes, Sequelize, Model } from "sequelize";

const reviewSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "reviews", {
            review_id: {
                type: DataTypes.UUID,
                allowNull : false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
            review_message: {
                type: DataTypes.STRING,
                allowNull : false,
            },
            review_images: {
                type: DataTypes.TEXT,
                allowNull : true,
            },
            review_rate: {
                type: DataTypes.FLOAT,
                allowNull : false,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull : false,
                defaultValue : true
            },
        }, {
            timestamps: true,
        }
    );
};

export default reviewSchema;
