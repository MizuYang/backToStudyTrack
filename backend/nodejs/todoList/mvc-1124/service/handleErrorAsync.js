export const handleErrorAsync = (func) => async (req, res, next) => {
  return func(req, res, next).catch(next);
};
