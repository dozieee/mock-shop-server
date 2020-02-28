export default function makePatchProduct({ editProduct }) {
  return async function(httpRequest) {
    try {
      const productInfo = httpRequest.body;
      const { id } = httpRequest.params;
      const updatedProduct = await editProduct({ id, ...productInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'success', data: updatedProduct },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode:
          e.message === 'the product you want to edit does not exist'
            ? 404
            : 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}
