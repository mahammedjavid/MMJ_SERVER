const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
//
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  port: DB_PORT,
});
const UserTable = require('../app/users/models/userModel')(sequelize, Sequelize)


const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Database connected and synchronized");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

  module.exports = connectToDatabase

