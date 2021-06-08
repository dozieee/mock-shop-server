import { config } from 'dotenv';
config();
// import { makeDb } from '../index';
(async function setupDb () {
  console.log('Setting up database...');
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist

  console.log('Database setup complete...');
  process.exit();
})();