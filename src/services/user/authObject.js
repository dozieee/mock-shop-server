/**
 * i decieded to go for the same response message for all login authentication error
 * the reason for this is to secure the appliction from brut-force attack
 * so that the attacker will not know which signin credentials are valid ones
 * credentials =>
 *  1. email
 *  2. password
 * for wrong email or password the error message remains consistent for both error cases
 */

import Entity from '../../entites';
const { makeUser } = Entity;
// login
export function makeSignin({ mockShopDb, generateToken }) {
  return async function login({ email, password }) {
    if (!email) {
      throw new Error('You must supply an Email');
    }
    if (!password) {
      throw new Error('You must supply a password');
    }
    const exits = await mockShopDb.findByEmail(email);
    if (!exits) {
      throw new Error('Auth Failed');
    }
    const authUser = makeUser(exits);
    if (!authUser.validPassword(password)) {
      throw new Error('Auth failed');
    }
    // generate the token plus other meta-data to be sent to the client
    const token = generateToken({
      payload: {
        userId: authUser.getId(),
        isAdmin: authUser.getRole(),
      },
    });
    return token;
  };
}

// logout => this will be out in version 2
// export function makeLogout({ mockShopDb }) {}

// this is responsible for the user signup
// take in the login funtion as dependency, it make use of this to log the user in as soon as the user sigup is done
export function makeSignup({ mockShopDb, signin, createCart }) {
  return async function signup(userInfo) {
    const user = makeUser({ ...userInfo });
    const exit = await mockShopDb.findByEmail(user.getEmail());
    if (exit) {
      // this error message is delibrate
      throw new Error('Signup failed, You are already registered');
    }
    const created = await mockShopDb.insert({
      email: user.getEmail(),
      password: user.getPassword(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      isAdmin: user.getRole(),
    });
    // could have run them in paralle but the user id is needed for the cart creation
    await createCart(created.id);
    return signin({ email: user.getEmail(), password: userInfo.password });
  };
}
