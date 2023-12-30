import { DataTypes, Sequelize, Model } from "sequelize";

const WishlistSchema = (sequelize: Sequelize) => {
    return sequelize.define(
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
};

export default WishlistSchema;
