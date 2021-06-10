/**
 * i decieded to go for the same response message for all login authentication error
 * the reason for this is to secure the appliction from brut-force attack
 * so that the attacker will not know which signin credentials are valid ones
 * credentials =>
 *  1. email
 *  2. password
 * for wrong email or password the error message remains consistent for both error cases
 */
// generate password hash
import bcrypt from 'bcryptjs'
function encryptPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainPassword, salt);
}
// compare the hash
function validatePassword(plainPassword, hash) {
  return bcrypt.compareSync(plainPassword, hash);
}

// login
export function makeSignin({ mockShopDb, generateToken }) {
  return async function login({ email, password }) {
    if (!email) {
      throw new Error('You must supply an Email');
    }
    if (!password) {
      throw new Error('You must supply a password');
    }
    console.log(email, password)
    const exits = await mockShopDb.findByEmail(email);
    if (!exits) {
      throw new Error('Auth Failed');
    }
 
    if (!validatePassword(password, exits.password)) {
      throw new Error('Auth failed');
    }
    // generate the token plus other meta-data to be sent to the client
    const token = generateToken({
      payload: {
        userId: exits._id,
        isAdmin: exits.isAdmin,
      },
    });
    delete exits.password
    return { token,  user: exits};
  };
}

// logout => this will be out in version 2
// export function makeLogout({ mockShopDb }) {}

// this is responsible for the user signup
// take in the login funtion as dependency, it make use of this to log the user in as soon as the user sigup is done
export function makeSignup({ mockShopDb, signin }) {
  return async function signup(userInfo) {
    if (!userInfo.firstName) {
      throw new Error("you must provide firstName") 
     }
     if (!userInfo.lastName) {
      throw new Error("you must provide lastName") 
     }
     if (!userInfo.email) {
      throw new Error("you must provide email") 
     }
     if (!userInfo.email) {
      throw new Error("you must provide email") 
     }
     if (!userInfo.phone) {
      throw new Error("you must provide phone") 
     }
     if (!userInfo.password) {
      throw new Error("you must provide password") 
     }
     
    const exit = await mockShopDb.findByEmail(userInfo.email);
    if (exit) {
      // this error message is delibrate
      throw new Error('Signup failed, You are already registered');
    }

    userInfo.isAdmin = false
    userInfo.password = encryptPassword(userInfo.password)
    await mockShopDb.insert(userInfo);
    // could have run them in paralle but the user id is needed for the cart creation
    return signin({ email: userInfo.email, password: userInfo.password });
  };
}


// login
export function makeUpdate({ mockShopDb }) {
  return async function update({ userId, ...updateUser }) {
    if (!userId) {
      throw new Error('You must supply the userId');
    }
    const exits = await mockShopDb.findById(userId);
    if (!exits) {
      throw new Error('user does not exit');
    }
 
    const update = mockShopDb.update(updateUser)
    return update;
  };
}
