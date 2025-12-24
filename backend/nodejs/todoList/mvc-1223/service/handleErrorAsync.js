const handleErrorAsync = (func) => (req, res, next) => {
  func(req, res, next).catch(next);
};

export default handleErrorAsync;
