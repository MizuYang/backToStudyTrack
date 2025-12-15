export const handleResponse = ({
  req,
  res,
  statusCode,
  message,
  data,
  err,
  next,
}) => {
  if (err) {
    if (process.env.NODE_ENV === "production") {
      res.json({
        status: "error",
        statusCode: statusCode || 500,
        message: message || "伺服器錯誤，請稍後再試",
      });
    } else {
      res.json({
        status: "error",
        statusCode: statusCode || 500,
        message: message || "伺服器錯誤，請稍後再試",
        error: err.message,
        stack: err.stack,
      });
    }
  }

  res.json({
    status: "success",
  });
};
