import model from '../models';
(async () => {
  console.log('Setting up database...');
  try {
    await model.sequelize.sync();
    console.log('Database setup completed.');
  } catch (error) {
    console.log(error.messages);
    process.exit();
  }
})();
