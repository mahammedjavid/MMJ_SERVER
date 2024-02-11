import { Op, Sequelize, SequelizeScopeError } from "sequelize";
import UserSchema from "../models/customer";
import CartSchema from "../models/cart";
import OrderSchema from "../models/order";
import OrderItemSchema from "../models/orderItem";
import PaymentSchema from "../models/paymentModel";
import ProductSchema from "../models/Product";
import ShipmentSchema from "../models/shipment";
import WishlistSchema from "../models/wishList";
import AddressSchema from "../models/address";
import CategorySchema from "../models/category";
import BulkUploadSchema from "../models/bulkUploadResponce";

const {
  DB_USER = "",
  DB_PASSWORD = "",
  DB_HOST = "",
  DB_NAME = "",
  DB_PORT = "",
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: parseInt(DB_PORT, 10),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log,
});

const UserTable = UserSchema(sequelize);
const CartTable = CartSchema(sequelize);
const OrderTable = OrderSchema(sequelize);
const OrderItemTable = OrderItemSchema(sequelize);
const PaymentTable = PaymentSchema(sequelize);
const ProductTable = ProductSchema(sequelize);
const ShipmentTable = ShipmentSchema(sequelize);
const WishlistTable = WishlistSchema(sequelize);
const AddressTable = AddressSchema(sequelize);
const CategoryTable = CategorySchema(sequelize);
const BulkUploadTable = BulkUploadSchema(sequelize);

UserTable.hasMany(AddressTable, { foreignKey: "customer_id" });
AddressTable.belongsTo(UserTable, { foreignKey: "customer_id" });

UserTable.hasMany(OrderTable, { foreignKey: "customer_id" });
OrderTable.belongsTo(UserTable, { foreignKey: "customer_id" });

UserTable.hasOne(CartTable, { foreignKey: "customer_id" });
CartTable.belongsTo(UserTable, { foreignKey: "customer_id" });

UserTable.hasMany(WishlistTable, { foreignKey: "customer_id" });
WishlistTable.belongsTo(UserTable, { foreignKey: "customer_id" });

UserTable.hasMany(PaymentTable, { foreignKey: "customer_id" });
PaymentTable.belongsTo(UserTable, { foreignKey: "customer_id" });

BulkUploadTable.belongsTo(UserTable, { foreignKey: "customer_id" });

ProductTable.belongsTo(CategoryTable, { foreignKey: "category_id" });
CategoryTable.hasMany(ProductTable, { foreignKey: "category_id" });

OrderTable.hasMany(OrderItemTable, { foreignKey: "order_id" });
OrderItemTable.belongsTo(OrderTable, { foreignKey: "order_id" });

OrderTable.hasOne(ShipmentTable, { foreignKey: "order_id" });
ShipmentTable.belongsTo(OrderTable, { foreignKey: "order_id" });

CartTable.belongsTo(ProductTable, { foreignKey: "product_id" });
ProductTable.hasMany(CartTable, { foreignKey: "product_id" });

WishlistTable.belongsTo(ProductTable, { foreignKey: "product_id" });
ProductTable.hasMany(WishlistTable, { foreignKey: "product_id" });

sequelize
  .authenticate()
  .then(() => console.log("db is connected"))
  .catch((err: SequelizeScopeError) =>
    console.log("------------------------" + err)
  );

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("--------------------------------", error);
  });

export {
  UserTable,
  CartTable,
  OrderTable,
  OrderItemTable,
  PaymentTable,
  ProductTable,
  ShipmentTable,
  WishlistTable,
  AddressTable,
  CategoryTable,
  BulkUploadTable,
};
