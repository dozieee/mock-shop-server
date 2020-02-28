// the services
import productService from '../../services/product'; //cart service
const { addProduct, deleteProduct, editProduct, getProduct } = productService;

// product controllers
import makeAddProduct from './add-product';
import makeDeleteProduct from './delete-product';
import makeGetProduct from './get-product';
import makePatchProduct from './patch-product';

// the controller object
const productController = Object.freeze({
  addProduct: makeAddProduct({ addProduct }),
  deleteProduct: makeDeleteProduct({ deleteProduct }),
  patchProduct: makePatchProduct({ editProduct }),
  getProduct: makeGetProduct({ getProduct }),
});
// export
export default productController;
