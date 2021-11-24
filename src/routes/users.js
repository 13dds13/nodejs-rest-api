const express = require("express");
const multer = require("multer");

const {
  usersSignup,
  usersLogin,
  usersLogout,
  getCurrentUser,
  updateUsersAvatar,
} = require("../controllers/users");
const authCheck = require("../middlewares/authCheck");
const { checkUsersReqBody } = require("../middlewares/checkReqBody");
const storage = require("../../config/multerStorage");

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/signup", checkUsersReqBody, usersSignup);
router.post("/login", checkUsersReqBody, usersLogin);
router.post("/logout", authCheck, usersLogout);
router.get("/current", authCheck, getCurrentUser);
router.patch("/avatars", authCheck, upload.single("avatar"), updateUsersAvatar);

module.exports = router;
