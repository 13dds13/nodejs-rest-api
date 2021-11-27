const express = require("express");
const multer = require("multer");

const {
  usersSignup,
  usersLogin,
  usersLogout,
  getCurrentUser,
  updateUsersAvatar,
  usersEmailVerification,
  repeatEmailVerification,
} = require("../controllers/users");
const authCheck = require("../middlewares/authCheck");
const { checkUsersReqBody } = require("../middlewares/checkReqBody");
const storage = require("../../config/multerStorage");
const verifyCheck = require("../middlewares/verifyCheck");
const router = express.Router();
const upload = multer({ storage: storage });

router.post("/signup", checkUsersReqBody, usersSignup);
router.get("/verify/:verificationToken", usersEmailVerification);
router.post("/verify", repeatEmailVerification);
router.post("/login", verifyCheck, checkUsersReqBody, usersLogin);
router.post("/logout", authCheck, usersLogout);
router.get("/current", authCheck, getCurrentUser);
router.patch("/avatars", authCheck, upload.single("avatar"), updateUsersAvatar);

module.exports = router;
