// Create a new file, e.g., middleware.js
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const configureMiddleware = (app) => {
  app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(express.json());
  app.use(compression());
  app.use(passport.initialize());
};

module.exports = configureMiddleware;
