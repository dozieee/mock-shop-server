module.exports = async function notFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      status: 'error',
      error: 'Not found.',
    },
    statusCode: 404,
  };
};
