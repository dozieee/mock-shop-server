// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'cart' });
// services
import makeAddProductToCart from './add-product-to-cart';
import makeDeleteProductFromCart from './delete-product-from-cart';
// build the services by passing the db interface to it
const addProductToCart = makeAddProductToCart({ mockShopDb });
const deleteProductFromCart = makeDeleteProductFromCart({ mockShopDb });
// the Service object
const Cart = Object.freeze({ addProductToCart, deleteProductFromCart });
// export
export default Cart;
