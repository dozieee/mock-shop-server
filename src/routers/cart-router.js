// the cart router
import { Router } from 'express';
const route = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import Controller from '../controllers';
const { getCart, addToCart, deleteFromCart } = Controller;
// auth middleware
// import adminAuthMiddleware from '';
// the endpoints
// thw root endpoint
route.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'this is the cart service' },
  });
});
// the get cart endpoint
route.get('/get-cart', makeCallBack(getCart));
// the add product to cart endpoint
route.get('/add-to-cart/:id', makeCallBack(addToCart));
// the delete product from cart endpoint
route.get('/delet-from-cart/:id', makeCallBack(deleteFromCart));

export default route;
