export default function makeAddProduct({ addProduct }) {
  return async function(httpRequest) {
    try {
      const productInfo = httpRequest.body;
      const product = await addProduct({ productInfo });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 200, data: product },
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
