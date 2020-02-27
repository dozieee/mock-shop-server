// dependencies => the data-access the makeMochShopDb factory
import makeMockShop from '../../data-access';
// make the mockShopDb specific to this service
const mockShopDb = makeMockShop({ modelName: 'product' });
// services
import makeAddProduct from './add-product';
import makeGetProduct from './get-product';
import makeDeleteProduct from './delete-product';
import makeEditProduct from './edit-product';
// build the services by passing the db interface to it
const addProduct = makeAddProduct({ mockShopDb });
const getProduct = makeGetProduct({ mockShopDb });
const deleteProduct = makeDeleteProduct({ mockShopDb });
const editProduct = makeEditProduct({ mockShopDb });
// the Service object
const Product = Object.freeze({
  addProduct,
  getProduct,
  deleteProduct,
  editProduct,
});
// export
export default Product;
