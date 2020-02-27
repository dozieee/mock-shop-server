// cart entity factory
import makeCart from '';

export default function makeDeleteProductFromCart({ mockShopDb }) {
  return async function deleteProductFromCart({ id, userId }) {
    //* the id refers to the id of the product to be deleted from the cart
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
    const existing = await mockShopDb.findByUserId(userId);
    if (!existing) {
      throw new Error('the user does not have a cart');
    }
    const cart = makeCart(existing);
    cart.deleteProduct(id);
    return mockShopDb.update({
      id: cart.getId(),
      productIds: cart.getProductIds(),
    });
  };
}
