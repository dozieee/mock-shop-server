export default function makeGetProduct({ mockShopDb }) {
  return async function getProduct({
    id,
    name,
    category,
    price,
    inStock,
    priceCondition,
  }) {
    if (!id && !name && !category && !price && !inStock) {
      return mockShopDb.findAll();
    }
    let query = {};
    if (id) {
      query.id = id;
    }
    if (name) {
      query.name = name;
    }
    if (category) {
      query.category = category;
    }
    if (price) {
      query.price = price;
    }
    if (inStock === 'true') {
      query.inStock = true;
    }
    return mockShopDb.find(query);
  };
}
