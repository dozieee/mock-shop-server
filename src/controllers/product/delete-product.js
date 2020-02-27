export default function makeDeleteProduct({ deleteProduct }) {
  return async function(httpRequest) {
    try {
      const productInfo = httpRequest.body;
      const { deleted, id } = await deleteProduct({ productInfo });
      const statusCode = deleted ? 200 : 404;
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode,
        body: { status: statusCode, data: { deleted, id } },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 400,
          error: e.message,
        },
      };
    }
  };
}
