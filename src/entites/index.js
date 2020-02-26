// dependencies
import bcrypt from 'bcryptjs';
//
import makeProduct from './product';
import buildMakeUser from './user';
import makeCart from './cart';

// helper function

// buld the make user factory
const makeUser = buildMakeUser({ generatePassword, validatePassword });

// Entities
const Entity = Object.freeze({ makeCart, makeProduct, makeUser });
// generate password hash
function generatePassword(password) {
  return bcrypt.hashSync(password, 10);
}
// compare the hash
function validatePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export default Entity;
