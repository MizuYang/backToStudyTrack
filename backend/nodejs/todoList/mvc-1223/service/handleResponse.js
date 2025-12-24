const handleResponse = ({
  res,
  status,
  statusCode,
  message,
  data,
  err,
  next,
}) => {
  if (err) {
    if (process.env.NODE_ENV === "production") {
      return res.status(statusCode || 500).json({
        status: status || "error",
        statusCode: statusCode || 500,
        message: message || "伺服器錯誤，請稍後再試",
      });
    } else {
      return res.status(statusCode || 500).json({
        status: status || "error",
        statusCode: statusCode || 500,
        message: message || "伺服器錯誤，請稍後再試",
        error: err.message,
        stack: err.stack,
      });
    }
  }

  res.status(statusCode).json({
    status,
    statusCode,
    message,
    data,
  });
};

export default handleResponse;
