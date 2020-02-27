// cart entity factory
import Entity from '../../entites';
const { makeCart } = Entity

export default function makeAddProduct({ mockShopDb }) {
  return async function addProduct({ name, ...rest }) {
    if (!name) {
      throw new Error('your product must have a name');
    }
    const existing = await mockShopDb.findByName({ name });
    if (existing) {
      throw new Error('the product with this name already exits');
    }
    const newProduct = makeProduct({ name, ...rest });
    // insert the new product to the database
    return mockShopDb.insert({
    });
  };
}
