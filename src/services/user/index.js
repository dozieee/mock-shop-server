// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'User' });
import { generateToken } from '../../modules/auth';

// services
import { makeSignin, makeSignup, makeUpdate, makeGetProfile } from './authObject';
// build the signup function with its dependencies => db_interface, generateToken
const signin = makeSignin({ mockShopDb, generateToken });
// build the signin function with its dependencies => db_interface, generateToken
const signup = makeSignup({ mockShopDb, signin });

const updateUser = makeUpdate({ mockShopDb });
const getProfile = makeGetProfile({ mockShopDb })

// auth service
const authService = Object.freeze({ signup, signin, updateUser, getProfile });

export default authService;
