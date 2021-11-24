const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/dbService/usersDbService");
require("dotenv").config();

const secretKey = process.env.SECRET;

module.exports = async (req, res, next) => {
  try {
    const headerTokenFormRequest = req.headers.authorization;
    if (!headerTokenFormRequest) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    const [, headerToken] = headerTokenFormRequest.split(" ");
    const verify = jwt.verify(headerToken, secretKey);
    if (!verify) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    const {
      payload: { id },
    } = verify;
    const user = await findUserById(id);
    if (user.token !== headerToken) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
