// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'user' });
import { generateToken } from '../../modules/auth';

// services
import { makeSignin, makeSignup } from './authObject';
import { createCart } from '../cart';
// build the signup function with its dependencies => db_interface, generateToken
const signin = makeSignin({ mockShopDb, generateToken });
// build the signin function with its dependencies => db_interface, generateToken
const signup = makeSignup({ mockShopDb, signin, createCart });

// auth service
const authService = Object.freeze({ signup, signin });

export default authService;
