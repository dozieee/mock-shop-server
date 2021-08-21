// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the userDB specific to this service
const userDB = makeMockShop({ modelName: 'User' });
import { generateToken } from '../../modules/auth';

// services
import { makeSignin, makeSignup, makeUpdate, makeGetProfile, makeForgetPassoword, makeForgetPassowordConfirm } from './authObject';
// build the signup function with its dependencies => db_interface, generateToken
const signin = makeSignin({ userDB, generateToken });
// build the signin function with its dependencies => db_interface, generateToken
const signup = makeSignup({ userDB, signin });

const updateUser = makeUpdate({ userDB });
const getProfile = makeGetProfile({ userDB })
const forgetPassword = makeForgetPassoword({ userDB })
const forgetPasswordConfirm = makeForgetPassowordConfirm({ userDB })

// auth service
const authService = Object.freeze({ signup, signin, updateUser, getProfile, forgetPassword, forgetPasswordConfirm });

export default authService;
