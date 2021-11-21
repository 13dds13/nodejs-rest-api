const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET;
const {
  createNewUser,
  findUserByEmail,
  updateUserToken,
} = require("../services/dbService/usersDbService");

const usersSignup = async (req, res) => {
  try {
    const createdNewUser = await createNewUser(req.body);
    if (!createdNewUser) {
      res.status(409).json({ message: "Email in use" });
      return;
    }
    const { email, subscription } = createdNewUser;
    res.status(201).json({
      user: { email, subscription },
    });
  } catch (error) {
    console.log(error);
  }
};

const usersLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      res
        .status(400)
        .json({ message: `User with email: ${email} doesn't exist` });
      return;
    }
    const isPasswordValid = user.validPassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: `Wrong password!` });
      return;
    }
    const { subscription, _id: id } = user;
    const token = jwt.sign({ payload: { id } }, secretKey);
    await updateUserToken(id, token);
    res.json({ token, user: { email, subscription } });
  } catch (error) {
    console.log(error);
  }
};

const usersLogout = async (req, res) => {
  try {
    await updateUserToken(req.user.id, null);
    res.status(204).json();
  } catch (error) {
    console.log(error);
  }
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

module.exports = {
  usersSignup,
  usersLogin,
  usersLogout,
  getCurrentUser,
};
