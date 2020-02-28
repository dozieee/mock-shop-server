import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import model from './data-access/models';

// config env
config();

const app = express();
//
app.use(json());
app.use(urlencoded({ extended: false }));
// cors
app.use(cors());
// enable logging
app.use(morgan('dev'));
// TODO: figure out DNT compliance.
app.use((_, res, next) => {
  res.set({ Tk: '!' });
  next();
});

// connect to the postgres database
const { sequelize } = model;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the Postgress db successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the Postgres database:', err);
  });

// router setup
import routers from './routers';
routers(app);

export default app;
