// the services
import cartService from '../../services/cart'; //cart service
const { addProductToCart, deleteProductFromCart, getCart } = cartService;

// cart Controllers
import makeGetCart from './get-cart';
import makeAddToCart from './add-to-cart';
import makeDeleteFromCart from './delete-from-cart';

// the controller object
const cartController = Object.freeze({
  getCart: makeGetCart({ getCart }),
  addToCart: makeAddToCart({ addProductToCart }),
  deleteFromCart: makeDeleteFromCart({ deleteProductFromCart }),
});
// export
export default cartController;
