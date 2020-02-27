export default function makeDeleteFromCart({ deleteProductFromCart }) {
  return async function(httpRequest) {
    try {
      const { id } = httpRequest.body;
      const userId = httpRequest.authObject.userId;
      const updatedCart = await deleteProductFromCart({ id, userId });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'sucess', data: updatedCart },
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
