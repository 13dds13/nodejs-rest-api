const { findUserByEmail } = require("../services/dbService/usersDbService");

module.exports = async (req, res, next) => {
  const user = await findUserByEmail(req.body.email);
  if (user.verify) {
    next();
    return;
  }
  res.status(400).json({ message: "Verification has not been passed" });
};
