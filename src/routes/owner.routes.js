const { Router } = require("express");
const {
  ownerRegister,
  ownerLogin,
  ownerLogout,
} = require("../controllers/owner/owner.controller");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/register").post(ownerRegister);
//secured routes
router.route("/login").post(verifyJWT, ownerLogin);
router.route("/logout").post(verifyJWT, ownerLogout);

module.exports = router;
