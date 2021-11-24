const gravatar = require("gravatar");
const jimp = require("jimp");
const fs = require("fs");

const createDefaultAvatar = (userEmail) =>
  gravatar.url(userEmail, { s: "100", r: "x", d: "retro" }, true);

const imgPreparetion = (uploadedFile, fileName) => {
  jimp.read(uploadedFile, (err, img) => {
    if (err) throw err;
    img.resize(250, 250).write("./public/avatars/" + fileName);
  });
};

const removeTempFile = (uploadedFile) => fs.unlinkSync(uploadedFile);

module.exports = {
  createDefaultAvatar,
  imgPreparetion,
  removeTempFile,
};
