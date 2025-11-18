export const successHandler = (req, res, statusCode, message, data) => {
  return res.status(statusCode).send({
    statusCode,
    message,
    data,
  });
};
