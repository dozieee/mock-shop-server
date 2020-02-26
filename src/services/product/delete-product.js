export default function makeDeleteProduct({ mockShopDb }) {
  return async function deleteProduct(id) {
    if (!id) {
      throw new Error(
        'you must provid the is of the product you want to delete',
      );
    }
    // destroy the product with the id
    mockShopDb.remove(id);
  };
}
