export default function makeCart({ id, productIds = [], userId } = {}) {
  if (!userId) {
    throw new Error('cart must have a userId');
  }
  // getters and setter
  return Object.freeze({
    getId: () => id,
    getProductIds: () => productIds,
    addProduct: (newProductId) => {
      if (productIds.includes(Number(newProductId))) {
        throw new Error('This product as been added to your cart already');
      }
      productIds = [...productIds, newProductId];
    },
    deleteProduct: (productId) => {
      const index = productIds.indexOf(Number(productId));
      if (index < 0) {
        throw new Error('The Product is not in you cart');
      }
      productIds.splice(index, 1);
    },
    getUserId: () => userId,
  });
}
