import model from '../src/data-access/models';
(async () => {
  console.log('Setting up database...');
  try {
    await model.sequelize.sync();
    console.log('Database setup completed.');
    process.exit();
  } catch (error) {
    console.log(error.messages);
    process.exit();
  }
})();
