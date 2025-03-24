const ResponseHandler = (status, data, message) => {
  return {
    status,
    data,
    message,
  }
};

module.exports = ResponseHandler;