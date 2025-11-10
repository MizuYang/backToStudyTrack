export const handleSuccess = (req, res, statusCode, message, data) => {
  return res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
};
