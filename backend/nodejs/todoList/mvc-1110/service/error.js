export const errorHandler = (req, res, statusCode, message) => {
  res.status(statusCode).send({
    statusCode,
    message,
    data: null,
  });
};
