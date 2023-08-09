const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define(
        "wishlist", {
            wishlist_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        }, {
            timestamps: true,
        }
    );

    // Define associations here, if needed
    // User.associate = (models) => {
        // Define associations here
    // };

    return Wishlist;
};
