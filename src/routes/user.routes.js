const { Router } = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/user/user.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/register").post(userRegister);
//secured routes
router.route("/login").post(verifyJWT, userLogin);
router.route("/logout").post(verifyJWT, userLogout);

module.exports = router;
