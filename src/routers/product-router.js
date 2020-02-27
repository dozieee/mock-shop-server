// the product router
import { Router } from 'express';
const route = Router();
// the make express callback
import makeCallBack from '../express-callback';
// the controllers
import Controller from '../controllers';
const { getProduct, addProduct, patchProduct, deleteProduct } = Controller;
// auth middleware
// import adminAuthMiddleware from '';
// the endpoints
// thw root endpoint
route.get('/', (req, res) => {
  res
    .status(200)
    .json({
      status: 'success',
      data: { message: 'this is the product service' },
    });
});
// the get product endpoint
route.get('/get-product', makeCallBack(getProduct));
// the add product endpoint
route.post('/add-product', makeCallBack(addProduct));
// the patch product endpoint
route.patch('/edit-product/:id', makeCallBack(patchProduct));
// the delete product endpoint
route.delete('/delete-product/:id', makeCallBack(deleteProduct));

export default route;
