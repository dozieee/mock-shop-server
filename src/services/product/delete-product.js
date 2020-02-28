export default function makeDeleteProduct({ mockShopDb }) {
  return async function deleteProduct(id) {
    if (!id) {
      throw new Error(
        'you must provid the Id of the product you want to delete',
      );
    }
    // destroy the product with the id
    const deleted = await mockShopDb.remove(id);
    return { deleted, id };
  };
}
