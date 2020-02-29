export default function makeGetCart({ mockShopDb }) {
  return async function({ id, productId, isAdmin }) {
    if (!id && !productId) {
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

    const carts = await mockShopDb.find(query);
    return carts.length <= 1 ? carts[0] : carts;
  };
}
