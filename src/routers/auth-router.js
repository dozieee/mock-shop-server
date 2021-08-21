// the cart router
import { Router } from 'express';
const router = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import authController from '../controllers/user';
const { signin, signup, update , getProfile, forgetPasswordConfirm, forgetPassword} = authController;
// auth middleware
import { authMiddleware } from '../middlewares';
// the endpoints
// thw root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'This is auth service' },
  });
});
// the signup endpoint
router.post('/signup', makeCallBack(signup));
// the signin endpoint
router.post('/signin', makeCallBack(signin));
// 
router.post('/update-profile', authMiddleware, makeCallBack(update));
router.get('/get-profile', authMiddleware, makeCallBack(getProfile));
router.post('/forgot-password', makeCallBack(forgetPassword));
router.post('/forgot-password-confirm', makeCallBack(forgetPasswordConfirm));

export default router;
