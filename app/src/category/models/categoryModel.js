const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Categoty = sequelize.define(
        "categoty", {
            category_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            timestamps: true,
        }
    );

    // Define associations here, if needed
    // User.associate = (models) => {
        // Define associations here
    // };

    return Categoty;
};
