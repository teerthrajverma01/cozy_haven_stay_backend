const { Router } = require("express");
const {
  adminLogin,
  adminLogout,
} = require("../controllers/admin/admin.controller");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

//secured routes
router.route("/login").post(verifyJWT, adminLogin);
router.route("/logout").post(verifyJWT, adminLogout);

module.exports = router;
