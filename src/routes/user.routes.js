const { Router } = require("express");
const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/user/user.controller.js");
const {
  updateUserDetail,
} = require("../controllers/user/userDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
//secured routes (jwt verification needed)
router.route("/logout").post(verifyJWT, userLogout);
router.route("/dashboard/update-user").post(verifyJWT, updateUserDetail);

module.exports = router;
