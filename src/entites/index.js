// dependencies
import bcrypt from 'bcryptjs';
//
import makeProduct from './product';
import buildMakeUser from './user';
import makeCart from './cart';

// helper function

// buld the make user factory
const makeUser = buildMakeUser({ encryptPassword, validatePassword });

// Entities
const Entity = Object.freeze({ makeCart, makeProduct, makeUser });
// generate password hash
function encryptPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
}
// compare the hash
function validatePassword(plainPassword, hash) {
  return bcrypt.compareSync(plainPassword, hash);
}

export default Entity;
