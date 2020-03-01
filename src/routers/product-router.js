// the product router
import { Router } from 'express';
const router = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import Controller from '../controllers/product';
const { getProduct, addProduct, patchProduct, deleteProduct } = Controller;
// auth middleware
import { admnAuthMiddleware, authMiddleware } from '../middlewares';

// the endpoints
// thw root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: 'this is product service' },
  });
});
// the get product endpoint
router.get('/get-product', makeCallBack(getProduct));
// the add product endpoint
router.post(
  '/add-product',
  authMiddleware,
  admnAuthMiddleware,
  makeCallBack(addProduct),
);
// the patch product endpoint
router.put(
  '/edit-product/:id',
  authMiddleware,
  admnAuthMiddleware,
  makeCallBack(patchProduct),
);
// the delete product endpoint
router.delete(
  '/delete-product/:id',
  authMiddleware,
  admnAuthMiddleware,
  makeCallBack(deleteProduct),
);

export default router;
