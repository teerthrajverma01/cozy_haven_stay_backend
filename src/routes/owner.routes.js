const { Router } = require("express");
const {
  ownerRegister,
  ownerLogin,
  ownerLogout,
} = require("../controllers/owner/owner.controller");
const {
  updateOwnerDetail,
  addNewHotelDetail,
  updateHotelDetail,
  getHotelDetailByOwnerId,
  getAllRoomDetailByOwnerId,
  deleteRoomDetailByRoomId,
  updateRoomDetailByRoomId,
} = require("../controllers/owner/ownerDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

// unsecured routes
router.route("/register").post(ownerRegister);
router.route("/login").post(ownerLogin);
//secured routes (jwt verification needed)
router.route("/logout/:ownerid").post(verifyJWT, ownerLogout);
router.route("/dashboard/update-owner").put(verifyJWT, updateOwnerDetail);
router.route("/dashboard/add-new-hotel").post(verifyJWT, addNewHotelDetail);
router.route("/dashboard/update-hotel").put(verifyJWT, updateHotelDetail);
router
  .route("/dashboard/get-hotel/:ownerid")
  .get(verifyJWT, getHotelDetailByOwnerId);
router
  .route("/dashboard/get-rooms/:ownerid")
  .get(verifyJWT, getAllRoomDetailByOwnerId);
router
  .route("/dashboard/delete-room/:roomid")
  .delete(verifyJWT, deleteRoomDetailByRoomId);
router
  .route("/dashboard/update-room/:roomid")
  .put(verifyJWT, updateRoomDetailByRoomId);

module.exports = router;
