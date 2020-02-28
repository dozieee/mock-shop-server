module.exports = function makeSignup({ signup }) {
  return async function(httpRequest) {
    try {
      const authInfo = httpRequest.body;
      const auth = await signup(authInfo);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
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
