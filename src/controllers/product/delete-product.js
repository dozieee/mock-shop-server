export default function makeDeleteProduct({ deleteProduct }) {
  return async function(httpRequest) {
    try {
      const { id } = httpRequest.params;
      const { deleted, id: _id } = await deleteProduct(id);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: deleted ? 200 : 404,
        body: {
          status: deleted ? 'success' : 'error',
          data: { deleted, id: _id },
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}
