module.exports = function makeUpdate({ getProfile }) {
    return async function(httpRequest) {
      try {
        const userId = httpRequest.authObject.userId;
        const auth = await getProfile({ userId});
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
  