const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  operatorsAliases : false,
  pool: {
    max: 5, // Adjust as needed
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log,
});

const UserTable = require('../app/src/users/models/userModel')(sequelize, Sequelize);
const AddressTable = require('../app/src/address/models/addressModel')(sequelize, Sequelize);
const CartTable = require('../app/src/cart/models/cartModel')(sequelize, Sequelize);
const CategoryTable = require('../app/src/category/models/categoryModel')(sequelize, Sequelize);
const OrderTable = require('../app/src/order/models/orderModel')(sequelize, Sequelize);
const OrderItemTable = require('../app/src/order-item/models/orderItemModel')(sequelize, Sequelize);
const PaymentTable = require('../app/src/payment/models/paymentModel')(sequelize, Sequelize);
const ProductTable = require('../app/src/product/models/ProductModel')(sequelize, Sequelize);
const ShipmentTable = require('../app/src/shipment/models/shipmentModel')(sequelize, Sequelize);
const WishlistTable = require('../app/src/wishlist/models/wishListModel')(sequelize, Sequelize);
const BulkUpload = require('../app/src/bulk-upload-responce/models/bulkUploadModel')(sequelize, Sequelize);

UserTable.hasMany(AddressTable, { foreignKey: 'address_id' });
AddressTable.belongsTo(UserTable, { foreignKey: 'address_id' });

// A user can place multiple orders.
UserTable.hasMany(OrderTable, { foreignKey: 'customer_id' });
OrderTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

// A user can have multiple products in their wishlist.
UserTable.hasOne(CartTable, { foreignKey: 'customer_id' });
CartTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

UserTable.hasMany(WishlistTable, { foreignKey: 'customer_id' });
WishlistTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

// A user can have multiple payment methods.
UserTable.hasMany(PaymentTable, { foreignKey: 'customer_id' });
PaymentTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

BulkUpload.belongsTo(UserTable, { foreignKey: 'customer_id' });

// A product belongs to a category, and a category can have multiple products.
ProductTable.belongsTo(CategoryTable, { foreignKey: 'category_id' });
CategoryTable.hasMany(ProductTable, { foreignKey: 'category_id' });

// An order can have multiple order items, and an order item belongs to an order.
OrderTable.hasMany(OrderItemTable, { foreignKey: 'order_id' });
OrderItemTable.belongsTo(OrderTable, { foreignKey: 'order_id' });

// An order can have one shipment.
OrderTable.hasOne(ShipmentTable, { foreignKey: 'order_id' });
ShipmentTable.belongsTo(OrderTable, { foreignKey: 'order_id' });

// A cart item belongs to a product, and a product can be associated with multiple cart items.
CartTable.belongsTo(ProductTable, { foreignKey: 'product_id' });
ProductTable.hasMany(CartTable, { foreignKey: 'product_id' });

WishlistTable.belongsTo(ProductTable, { foreignKey: 'product_id' });
ProductTable.hasMany(WishlistTable, { foreignKey: 'product_id' });

// Authenticate and sync the database
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
    console.log("--------------------------------",error);
  });

module.exports = {
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
  BulkUpload
};
