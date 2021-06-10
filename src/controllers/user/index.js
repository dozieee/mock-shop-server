// use case
import authService from '../../services/user';
// contollers
import makeSignup from './signup';
import makeSignin from './signin';
import makeUpdate from './update-event';
// build the controller by passing the services
const signup = makeSignup({ signup: authService.signup });
const signin = makeSignin({ signin: authService.signin });
const update = makeUpdate({ update: authService.updateUser });
// constuct controllers with dependencies
const atuhController = Object.freeze({ signin, signup, update});

export default atuhController;
