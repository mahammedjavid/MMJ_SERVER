const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
});

const UserTable = require('../app/src/users/models/userModel')(sequelize, Sequelize);
const CartTable = require('../app/src/cart/models/cartModel')(sequelize, Sequelize);
// const CategoryTable = require('../app/src/category/models/categoryModel')(sequelize, Sequelize);
const OrderTable = require('../app/src/order/models/orderModel')(sequelize, Sequelize);
const OrderItemTable = require('../app/src/order-item/models/orderItemModel')(sequelize, Sequelize);
const PaymentTable = require('../app/src/payment/models/paymentModel')(sequelize, Sequelize);
const ProductTable = require('../app/src/product/models/ProductModel')(sequelize, Sequelize);
const ShipmentTable = require('../app/src/shipment/models/shipmentModel')(sequelize, Sequelize);
const WishlistTable = require('../app/src/wishlist/models/wishListModel')(sequelize, Sequelize);

UserTable.hasOne(CartTable, { foreignKey: 'customer_id' });
CartTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

UserTable.hasMany(OrderTable, { foreignKey: 'customer_id' });
OrderTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

UserTable.hasMany(WishlistTable, { foreignKey: 'customer_id' });
WishlistTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

UserTable.hasMany(PaymentTable, { foreignKey: 'customer_id' });
PaymentTable.belongsTo(UserTable, { foreignKey: 'customer_id' });

// CategoryTable.hasMany(ProductTable, { foreignKey: 'category_id' });
// ProductTable.belongsTo(CategoryTable, { foreignKey: 'category_id' });

OrderTable.hasMany(OrderItemTable, { foreignKey: 'order_id' });
OrderItemTable.belongsTo(OrderTable, { foreignKey: 'order_id' });

OrderTable.hasOne(ShipmentTable, { foreignKey: 'order_id' });
ShipmentTable.belongsTo(OrderTable, { foreignKey: 'order_id' });

CartTable.belongsTo(ProductTable, { foreignKey: 'product_id' });
ProductTable.hasMany(CartTable, { foreignKey: 'product_id' });

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
  // CategoryTable,
  OrderTable,
  OrderItemTable,
  PaymentTable,
  ProductTable,
  ShipmentTable,
  WishlistTable
};
