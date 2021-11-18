const checkReqBody = (req, res, schema) => {
  const { error } = schema.validate(req.body);
  if (!error) return true;
  res.status(400).json({ message: error.message });
  return;
};

module.exports = { checkReqBody };
