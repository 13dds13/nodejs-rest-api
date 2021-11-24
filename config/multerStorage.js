const multer = require("multer");

module.exports = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp/");
  },
  filename: function (req, file, cb) {
    const fileName = req.user.id;
    const [, fileExtansion] = file.originalname.split(".");
    cb(null, `${fileName}.${fileExtansion}`);
  },
});
