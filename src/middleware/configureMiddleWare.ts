import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import passport from 'passport';

const 
configureMiddleware = (app:express.Application) => {
  app.use(cors());
  app.options('*', cors());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(express.json());
  app.use(compression());
  app.use(passport.initialize());
};

export {configureMiddleware};
