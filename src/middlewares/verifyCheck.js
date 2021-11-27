const { findUserByEmail } = require("../services/dbService/usersDbService");

module.exports = (req, res, next) => {
  const user = findUserByEmail(req.body.email);
  if (user.verify) {
    next();
    return;
  }
  res.status(400).json({ message: "Verification has not been passed" });
};
