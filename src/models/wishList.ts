import { DataTypes, Sequelize, Model } from "sequelize";

const WishlistSchema = (sequelize: Sequelize) => {
    return sequelize.define(
        "wishlist", {
            wishlist_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV1,
            },
        }, {
            timestamps: true,
        }
    );
};

export default WishlistSchema;
