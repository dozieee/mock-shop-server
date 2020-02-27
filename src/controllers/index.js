// the services
import cartService from '../services/cart'; //cart service
import productService from '../services/product'; //cart service
const { addProductToCart, deleteProductFromCart, getCart } = cartService;
const { addProduct, deleteProduct, editProduct, getProduct } = productService;

// product controllers
import makeAddProduct from './product/add-product';
import makeDeleteProduct from './product/delete-product';
import makeGetProduct from './product/get-product';
import makePatchProduct from './product/patch-product';
// cart Controllers
import makeGetCart from './cart/get-cart';
import makeAddToCart from './cart/add-to-cart';
import makeDeleteFromCart from './cart/delete-from-cart';
// user controllers

// the controller object
const Controller = Object.freeze({
  // product
  addProduct: makeAddProduct({ addProduct }),
  deleteProduct: makeDeleteProduct({ deleteProduct }),
  patchProduct: makePatchProduct({ editProduct }),
  getProduct: makeGetProduct({ getProduct }),
  // cart
  getCart: makeGetCart({ getCart }),
  addToCart: makeAddToCart({ addProductToCart }),
  deleteFromCart: makeDeleteFromCart({ deleteProductFromCart }),
  // user
});
// export
export default Controller;
