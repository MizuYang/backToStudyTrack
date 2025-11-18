export const errorHandler = (req, res, statusCode, message) => {
  return res.status(statusCode).send({
    statusCode,
    message,
    data: null,
  });
};
