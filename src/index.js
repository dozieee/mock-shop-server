import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';

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
// router setup
// router setup
require('./routers').default(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Sever is litening on port', PORT, '...');
});
