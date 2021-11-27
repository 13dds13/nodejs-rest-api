const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuid } = require("uuid");

const {
  createNewUser,
  findUserByVerifyToken,
  makeUserVerified,
  findUserByEmail,
  updateUserToken,
  updateAvatarURL,
} = require("../services/dbService/usersDbService");
const mimeTypeCheck = require("../services/validation/mimeTypeCheck");
const {
  imgPreparetion,
  removeTempFile,
  createDefaultAvatar,
} = require("../services/imgService");
const { createMsg, sendVerifyLetter } = require("../../config/sgMail");

const secretKey = process.env.SECRET;
const port = process.env.PORT || 3000;

const usersSignup = async ({ body }, res) => {
  try {
    const avatarURL = createDefaultAvatar(body.email);
    const verifyToken = uuid();
    const newUserData = {
      ...body,
      avatarURL,
      verifyToken,
    };
    const createdNewUser = await createNewUser(newUserData);
    if (!createdNewUser) {
      res.status(409).json({ message: "Email in use" });
      return;
    }
    const { email, subscription } = createdNewUser;
    const msg = createMsg(email, verifyToken);
    await sendVerifyLetter(msg);
    res.status(201).json({
      user: { email, subscription },
    });
  } catch (error) {
    console.log(error);
  }
};

const usersEmailVerification = async (req, res, next) => {
  const { verificationToken } = req.params;
  try {
    const user = await findUserByVerifyToken(verificationToken);
    if (!user) {
      next();
      return;
    }
    await makeUserVerified(user);
    res.json({ message: "Verification successful" });
  } catch (error) {
    console.log(error);
  }
};

const repeatEmailVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Missing required field email" });
    return;
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res
        .status(400)
        .json({ message: `User with email: ${email} doesn't exist` });
      return;
    }
    if (user.verify) {
      res.status(400).json({ message: "Verification has been already passed" });
    }
    const msg = createMsg(email, user.verifyToken);
    await sendVerifyLetter(msg);
    res.json({ message: "Check Your email box for new letter" });
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

const updateUsersAvatar = async (req, res) => {
  const {
    file: { filename, path, mimetype },
    user,
  } = req;
  const currentUser = user.id;

  const isImage = mimeTypeCheck(mimetype);
  if (!isImage) {
    res.status(406).json({ message: "Only picture files allowed" });
    removeTempFile(path);
    return;
  }
  res.json({ message: "Successfully uploaded" });

  imgPreparetion(path, filename);
  removeTempFile(path);

  try {
    const newAvatarUrl = `http://localhost:${port}/avatars/${filename}`;
    await updateAvatarURL(currentUser, newAvatarUrl);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  usersSignup,
  usersLogin,
  usersLogout,
  getCurrentUser,
  updateUsersAvatar,
  usersEmailVerification,
  repeatEmailVerification,
};
