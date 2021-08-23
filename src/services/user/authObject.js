import { sendNotification } from '../../modules/notify/send-mail'
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
export function makeSignin({ userDB, generateToken }) {
  return async function login({ email, password }, dont_send) {
    if (!email) {
      throw new Error('You must supply an Email');
    }
    if (!password) {
      throw new Error('You must supply a password');
    }
    const exist = await userDB.findByEmail(email);
    if (!exist) {
      throw new Error('Auth Failed');
    }
    if (!validatePassword(password, exist.password)) {
      throw new Error('Auth failed');
    }
    // generate the token plus other meta-data to be sent to the client
    const token = generateToken({
      payload: {
        userId: exist.id,
        isAdmin: exist.isAdmin,
      },
    });
    delete exist.password
  
    !dont_send && sendNotification({ event: "USER_SIGIN", data: { email, name: exist.firstName} })

    return { token,  user: exist};
  };
}

// logout => this will be out in version 2
// export function makeLogout({ userDB }) {}

// this is responsible for the user signup
// take in the login funtion as dependency, it make use of this to log the user in as soon as the user sigup is done
export function makeSignup({ userDB, signin }) {
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
     
    const exist = await userDB.findByEmail(userInfo.email);
    if (exist) {
      // this error message is delibrate
      throw new Error('Signup failed, You are already registered');
    }

    userInfo.isAdmin = false
    const password = userInfo.password
    userInfo.password = encryptPassword(userInfo.password)
    await userDB.insert(userInfo);
    sendNotification({ event: "USER_CREATION", data: { email, name: exist.name} })
    // could have run them in paralle but the user id is needed for the cart creation
    return signin({ email: userInfo.email, password }, true);
  };
}


// login
export function makeUpdate({ userDB }) {
  return async function update({ userId, ...updateUser }) {
    if (!userId) {
      throw new Error('You must supply the userId');
    }
    const exist = await userDB.findById(userId);
    if (!exist) {
      throw new Error('user does not exist');
    }

    delete updateUser.password
    delete updateUser.email
    const update = await userDB.update({ id: userId, ...updateUser })
    return update;
  };
}

export function makeGetProfile({ userDB }){
  return async function getProfile({ userId }) {
    if (!userId) {
      throw new Error('You must supply the userId');
    }
    const exist = await userDB.findById(userId);
    if (!exist) {
      throw new Error('user does not exist');
    }
    delete exist.password
    return exist
  }
}



export function makeForgetPassoword({ userDB }){
  return async function ({ email }) {
    if (!email) {
      throw new Error('You must supply the email');
    }
    const [exist] = await userDB.find({ email });
    if (!exist) {
      return { message: "We've sent you an email please check your inbox to proceed" }
    }
    sendNotification({ event: "FORGET_PASSWORD", data: { email, name: exist.name, token: exist.id} })

    return { message: "We've sent you an email please check your inbox to proceed" }
  }
}


// take in the login funtion as dependency, it make use of this to log the user in as soon as the user sigup is done
export function makeForgetPassowordConfirm({ userDB }) {
  return async function ({ token, new_password }) {
    if (!new_password) {
      throw new Error("you must provide new password") 
     }
     if (!token) {
      throw new Error("you must provide token") 
     }

     if (new_password.length < 8) {
       throw new Error("Password must be more than 8 char")
     }
     
    const exist = await userDB.findById(token);
    if (!exist) {
      // this error message is delibrate
      throw new Error('You link has expired');
    }

    const password = encryptPassword(new_password)
    await userDB.update({ id: token, password  });
    
    return { message: "Password reset successful, you can login with you new password" }
  };
}