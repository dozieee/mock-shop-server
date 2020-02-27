// product entity
import makeProduct from '';

export default function makeEditProduct({ mockShopDb }) {
  return async function editProduct({ id, ...updatedInfo }) {
    if (!id) {
      throw new Error(
        'you must provide the product is of which you want to edit',
      );
    }
    const existing = await mockShopDb.findById(id);
    if (!existing) {
      throw new Error('the product you want to edit does not exist');
    }
    const product = makeProduct({ existing, ...updatedInfo });
    return mockShopDb.update({
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      category: product.getCategory(),
      price: product.getPrice(),
      imageUrl: product.getImageUrl(),
      inStock: product.stillInSock(),
    });
  };
}
