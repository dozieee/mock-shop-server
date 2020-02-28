module.exports = function makeSignin({ login }) {
  return async function(httpRequest) {
    try {
      const authInfo = httpRequest.body;
      const auth = await login(authInfo);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'success', auth },
      };
    } catch (e) {
      console.log(e);
      return e.message == 'Session limite reached'
        ? {
            headers: {
              'Content-Type': 'application/json',
            },
            statusCode: 400,
            body: {
              status: 'error',
              error: e.message,
            },
          }
        : {
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
