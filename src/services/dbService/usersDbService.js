const User = require("../../models/users");

const createNewUser = async (data) => {
  try {
    const newUser = new User(data);
    newUser.setPassword(data.password);
    const createdNewUser = await User.create(newUser);
    return createdNewUser;
  } catch (error) {
    console.log(error);
  }
};

const findUserByVerifyToken = async (verifyToken) => {
  try {
    const user = await User.findOne({ verifyToken });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateUserToken = async (id, token) => {
  try {
    await User.findByIdAndUpdate(
      id,
      { token },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const updateAvatarURL = async (id, avatarURL) => {
  try {
    await User.findByIdAndUpdate(
      id,
      { avatarURL },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const makeUserVerified = async (user) => {
  try {
    const dataToUpdate = { verify: true, verifyToken: null };
    await User.findByIdAndUpdate(
      user.id,
      { ...dataToUpdate },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  findUserByVerifyToken,
  findUserByEmail,
  updateUserToken,
  findUserById,
  updateAvatarURL,
  makeUserVerified,
};
