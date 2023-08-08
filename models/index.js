const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
//
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: DB_PORT,
});
const UserTable = require('../app/users/models/userModel')(sequelize, Sequelize)

sequelize
  .authenticate()
  .then(() => console.log("db is connected"))
  .catch((err) => console.log("error" + err));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

  module.exports = {UserTable}

