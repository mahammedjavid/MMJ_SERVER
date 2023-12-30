"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkUploadTable = exports.CategoryTable = exports.AddressTable = exports.WishlistTable = exports.ShipmentTable = exports.ProductTable = exports.PaymentTable = exports.OrderItemTable = exports.OrderTable = exports.CartTable = exports.UserTable = void 0;
const sequelize_1 = require("sequelize");
const customer_1 = __importDefault(require("../models/customer"));
const cart_1 = __importDefault(require("../models/cart"));
const order_1 = __importDefault(require("../models/order"));
const orderItem_1 = __importDefault(require("../models/orderItem"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const Product_1 = __importDefault(require("../models/Product"));
const shipment_1 = __importDefault(require("../models/shipment"));
const wishList_1 = __importDefault(require("../models/wishList"));
const address_1 = __importDefault(require("../models/address"));
const category_1 = __importDefault(require("../models/category"));
const bulkUploadResponce_1 = __importDefault(require("../models/bulkUploadResponce"));
const { DB_USER = "", DB_PASSWORD = "", DB_HOST = "", DB_NAME = "", DB_PORT = "3306", } = process.env;
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: "mysql",
    port: parseInt(DB_PORT, 10),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: console.log,
});
const UserTable = (0, customer_1.default)(sequelize);
exports.UserTable = UserTable;
const CartTable = (0, cart_1.default)(sequelize);
exports.CartTable = CartTable;
const OrderTable = (0, order_1.default)(sequelize);
exports.OrderTable = OrderTable;
const OrderItemTable = (0, orderItem_1.default)(sequelize);
exports.OrderItemTable = OrderItemTable;
const PaymentTable = (0, paymentModel_1.default)(sequelize);
exports.PaymentTable = PaymentTable;
const ProductTable = (0, Product_1.default)(sequelize);
exports.ProductTable = ProductTable;
const ShipmentTable = (0, shipment_1.default)(sequelize);
exports.ShipmentTable = ShipmentTable;
const WishlistTable = (0, wishList_1.default)(sequelize);
exports.WishlistTable = WishlistTable;
const AddressTable = (0, address_1.default)(sequelize);
exports.AddressTable = AddressTable;
const CategoryTable = (0, category_1.default)(sequelize);
exports.CategoryTable = CategoryTable;
const BulkUploadTable = (0, bulkUploadResponce_1.default)(sequelize);
exports.BulkUploadTable = BulkUploadTable;
UserTable.hasMany(AddressTable, { foreignKey: "address_id" });
AddressTable.belongsTo(UserTable, { foreignKey: "address_id" });
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
    .catch((err) => console.log("------------------------" + err));
sequelize
    .sync({ force: false })
    .then(() => {
    console.log("database connected");
})
    .catch((error) => {
    console.log("--------------------------------", error);
});
