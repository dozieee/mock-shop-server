module.exports = function makeSignin({ signin }) {
  return async function(httpRequest) {
    try {
      const authInfo = httpRequest.body;
      const auth = await signin(authInfo);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'success', data: auth },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 401,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
};
