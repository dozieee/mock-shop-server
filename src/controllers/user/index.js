// use case
import authService from '../../services/user';
// contollers
import makeSignup from './signup';
import makeSignin from './signin';
import makeGetProfile from './get-profile';
import makeUpdate from './update-profile';
import {makeForgetPassoword, makeForgetPassowordConfirm} from './forgetPass'
// build the controller by passing the services
const signup = makeSignup({ signup: authService.signup });
const signin = makeSignin({ signin: authService.signin });
const update = makeUpdate({ update: authService.updateUser });
const getProfile = makeGetProfile({ getProfile: authService.getProfile })
const forgetPassword = makeForgetPassoword({ service: authService.forgetPassword })
const forgetPasswordConfirm = makeForgetPassowordConfirm({ service: authService.forgetPasswordConfirm })
// constuct controllers with dependencies
const atuhController = Object.freeze({ signin, signup, update, getProfile, forgetPassword, forgetPasswordConfirm});

export default atuhController;
