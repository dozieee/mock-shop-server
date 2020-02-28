import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';

let sequelize;
const config = {
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  host: env.POSTGRES_HOST,
  dialect: 'postgres',
};

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);
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
