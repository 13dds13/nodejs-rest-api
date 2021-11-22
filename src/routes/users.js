const express = require("express");
const router = express.Router();

const {
  usersSignup,
  usersLogin,
  usersLogout,
  getCurrentUser,
} = require("../controllers/users");
const authCheck = require("../middlewares/authCheck");
const { checkUsersReqBody } = require("../middlewares/checkReqBody");

router.post("/signup", checkUsersReqBody, usersSignup);
router.post("/login", checkUsersReqBody, usersLogin);
router.post("/logout", authCheck, usersLogout);
router.get("/current", authCheck, getCurrentUser);

module.exports = router;
