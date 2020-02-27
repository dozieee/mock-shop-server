// cart entity factory
import makeCart from '';

export default function makeAddProductToCart({ mockShopDb, getProduct }) {
  return async function addProductToCart({ id, userId }) {
    //* the id refers to the id of the product to be added to the cart
    //* the userId refers to the id of the currently signed in user try to add a product to his/her cart
    if (!id) {
      throw new Error(
        'you must provide the is of the product you want to add to your cart',
      );
    }
    if (!userId) {
      throw new Error(
        'the userId of the currently signed in user nmust be provide',
      );
    }
    const [cartExisting, productExisting] = await Promise.all([
      mockShopDb.findByUserId(userId),
      getProduct({ id, inStock: 'true' }),
      //query for the the product with the id provided => check if the product exist
    ]);
    if (!cartExisting) {
      throw new Error('the user does not have a cart');
    }
    if (!productExisting[0]) {
      throw new Error('the product does not exist or is out of stock');
    }
    const cart = makeCart(existing);
    cart.addProduct(id);
    return mockShopDb.update({
      id: cart.getId(),
      productIds: cart.getProductIds(),
    });
  };
}
