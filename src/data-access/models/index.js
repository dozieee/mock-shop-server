import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV || 'development';

let sequelize;
let config;
if (process.env.NODE_ENV === 'event') {
  config = {
    username: process.env.POSTGRES_USERNAME_PRO,
    password: process.env.POSTGRES_PASSWORD_PRO,
    database: process.env.POSTGRES_DB_PRO,
    host: process.env.POSTGRES_HOST_PRO,
    dialect: 'postgres',
  };
} else {
  config = {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  };
}

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

// models
const models = {
  User: sequelize['import']('./user'),
  Event: sequelize['import']('./Event'),
  EventAttendance: sequelize['import']('./EventAttendance'),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
