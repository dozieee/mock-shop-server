export default function makeGetCart({ mockShopDb }) {
  return async function({ id, productId, userId, isAdmin }) {
    if (!id && !productId && !userId) {
      return mockShopDb.findAll();
    }
    let query = {};
    if (id) {
      query.id = id;
    }
    if (productId) {
      query.productId = productId;
      //! need to do more implentation
    }
    if (userId) {
      query.userId = userId;
    }
    const carts = await mockShopDb.find(query);
    return carts.length <= 1 ? carts[0] : carts;
  };
}
