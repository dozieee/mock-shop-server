// cart entity factory
import Entity from '../../entites';
const { makeCart } = Entity;

export default function makeAddProduct({ mockShopDb }) {
  return async function addProduct(userId) {
    if (!userId) {
      throw new Error('your userId must provided for the cart');
    }
    const existing = await mockShopDb.findByUserId(userId);
    if (existing) {
      throw new Error('the user already has a cart');
    }
    const newCart = makeCart({ userId });
    // insert the new product to the database
    return mockShopDb.insert({
      productIds: newCart.getProductIds(),
      userId: newCart.getUserId(),
    });
  };
}
