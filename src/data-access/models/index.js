import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV || 'development';

let sequelize;
const config = {
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
};

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.POSTGRES_URL);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// models
const models = {
  user: sequelize['import']('./user'),
  product: sequelize['import']('./product'),
  cart: sequelize['import']('./cart'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
