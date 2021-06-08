module.exports = function makeUpdate({ update }) {
    return async function(httpRequest) {
      try {
        const authInfo = httpRequest.body;
        const auth = await update({ userId: httpRequest.qury.id,...authInfo});
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
  