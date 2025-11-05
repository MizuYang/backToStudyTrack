export const handleSuccess = (res, data, message) => {
  res.status(200).send({
    statusCode: 200,
    message,
    data,
  });
};
