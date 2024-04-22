const { Router } = require("express");
const {
  adminLogin,
  adminLogout,
} = require("../controllers/admin/admin.controller");
const {
  getAllOwner,
  getAllUser,
  deleteUserById,
  deleteOwnerById,
} = require("..//controllers/admin/adminDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

// unsecured routes

//secured routes (jwt verification needed)
router.route("/login").post(adminLogin);
router.route("/logout").post(adminLogout);
router.route("/get-all-user").post(getAllUser);
router.route("/delete-user/:userid").post(deleteUserById);
router.route("/get-all-owner").post(getAllOwner);
router.route("/delete-owner/:ownerid").post(deleteOwnerById);

module.exports = router;
