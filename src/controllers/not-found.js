module.exports = async function notFound() {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      status: 404,
      error: 'Not found.',
    },
    statusCode: 404,
  };
};
