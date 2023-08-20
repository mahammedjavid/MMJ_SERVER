require('dotenv').config()
const express = require('express')
const compression = require('compression')
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');

const app = express()
const port = process.env.PORT || 3000
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json())
app.use(compression())


const appRoutes = require('./app/src/index');
app.use('/api', appRoutes);
app.use(passport.initialize())
app.listen(port, () => console.log(`Listening on port ${port}`));