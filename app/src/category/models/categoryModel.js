const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "category", {
            category_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category_image: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            timestamps: true,
        }
    );
    return Category;
};
