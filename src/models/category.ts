import { DataTypes, Sequelize, Model } from "sequelize";

const CategorySchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "category", {
            category_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category_image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            timestamps: true,
        }
    );
};

export default CategorySchema;
