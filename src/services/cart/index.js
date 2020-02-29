// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
import { getProduct } from '../product';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'cart' });
// services
import makeAddProductToCart from './add-product-to-cart';
import makeDeleteProductFromCart from './delete-product-from-cart';
import makeGetCart from './get-cart';
import makeCreateCart from './create-cart';
// build the services by passing the db interface to it
const addProductToCart = makeAddProductToCart({ mockShopDb, getProduct });
const deleteProductFromCart = makeDeleteProductFromCart({ mockShopDb });
const getCart = makeGetCart({ mockShopDb });
export const createCart = makeCreateCart({ mockShopDb });
// the Service object
const cartService = Object.freeze({
  addProductToCart,
  deleteProductFromCart,
  getCart,
  createCart,
});
// export
export default cartService;
