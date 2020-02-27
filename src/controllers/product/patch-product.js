export default function makePatchProduct({ editProduct }) {
  return async function(httpRequest) {
    try {
      const productInfo = httpRequest.body;
      const updatedProduct = await editProduct({ productInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 200, data: updatedProduct },
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
