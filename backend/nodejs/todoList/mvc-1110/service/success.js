export const successHandler = (req, res, statusCode, message, data = null) => {
  res.status(statusCode).send({
    statusCode,
    message,
    data,
  });
};
