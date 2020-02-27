export default function makeDeleteProduct({ deleteProduct }) {
  return async function(httpRequest) {
    try {
      const productInfo = httpRequest.body;
      const { deleted, id } = await deleteProduct({ productInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: deleted ? 200 : 404,
        body: { status: deleted ? 'sucess' : 'error', data: { deleted, id } },
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
