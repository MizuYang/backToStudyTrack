export const errorHandler = (req, res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    data: null,
  });
};
