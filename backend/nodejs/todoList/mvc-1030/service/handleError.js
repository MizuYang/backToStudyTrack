export const handleError = (res, statusCode, message) => {
  res.status(statusCode).send({
    statusCode,
    message,
    data: null,
  });
};
