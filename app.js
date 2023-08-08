require('dotenv').config()
 const express = require('express')
const compression = require('compression')
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()
const port = process.env.PORT || 3000
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json())
app.use(compression())

// Import and call the connection function
const connectToDatabase = require('./models/index'); // Adjust the path as needed
connectToDatabase().then(() => {
  // Include your application routes
  const appRoutes = require('./app/index');
  app.use('/api', appRoutes);

  // Start the server
  app.listen(port, () => console.log(`Listening on port ${port}`));
});






// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const morgan = require("morgan");
// const Logger = require("./_helpers/winston");
// const logger = new Logger("app");
// const errorHandler = require("./_helpers/error_handler");
// const passport = require("passport");
// var session = require("express-session");
// const app = express();
// const { SitemapStream, streamToPromise } = require("sitemap");
// const { createGzip } = require("zlib");
// const Sequelize = require("sequelize");
// require('./config/config');
// const path = require('path');
// const Op = Sequelize.Op;


// app.use(cors());
// app.options("*", cors());
// app.use(morgan("combined", { stream: logger.stream }));
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// app.use("/documents", express.static(path.join(__dirname, 'documents')));
// app.use("/netsuite_exports", express.static(path.join(__dirname, 'netsuite_exports')));