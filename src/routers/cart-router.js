// the cart router
import { Router } from 'express';
const router = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import cartController from '../controllers/cart';
const { getCart, addToCart, deleteFromCart } = cartController;
// auth middleware
import { authMiddleware } from '../middlewares';
// the endpoints
// thw root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'This is cart service' },
  });
});
// the get cart endpoint
router.get('/get-cart', authMiddleware, makeCallBack(getCart));
// the add product to cart endpoint
router.get('/add-to-cart/:id', authMiddleware, makeCallBack(addToCart));
// the delete product from cart endpoint
router.get('/delete-from-cart/:id', authMiddleware, makeCallBack(deleteFromCart));

export default router;
