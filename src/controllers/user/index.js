// use case
import authService from '../../services/user';
// contollers
import makeSignup from './signup';
import makeSignin from './signin';
// build the controller by passing the services
const signin = makeSignup({ signin: authService.signup });
const signup = makeSignin({ signup: authService.signin });
// constuct controllers with dependencies
const atuhController = Object.freeze({ signin, signup });

export default atuhController;
