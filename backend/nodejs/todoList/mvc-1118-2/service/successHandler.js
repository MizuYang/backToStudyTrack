export const successHandler = (req, res, statusCode, message, data) => {
  return res.status(statusCode).json({
    status: "success",
    statusCode,
    message,
    data,
  });
};
