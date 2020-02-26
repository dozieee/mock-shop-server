export default function makeCart({ id, productIds = [], userId } = {}) {
  // getters and setter
  return Object.freeze({
    getId: () => id,
    getProductIds: () => productIds,
    addProduct: (newProductId) => (productIds = [...productIds, newProductId]),
    getUserId: () => userId,
  });
}
