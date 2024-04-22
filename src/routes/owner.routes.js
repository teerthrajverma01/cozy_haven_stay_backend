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
} = require("../controllers/owner/ownerDashboard.controller.js");
const { verifyJWT } = require("../middlewares/auth.middleware.js");

const router = Router();

router.route("/register").post(ownerRegister);
//secured routes (jwt verification needed)
router.route("/login").post(ownerLogin);
router.route("/logout").post(ownerLogout);
router.route("/update-owner").post(updateOwnerDetail);
router.route("/add-new-hotel").post(addNewHotelDetail);
router.route("/update-hotel").post(updateHotelDetail);
router.route("/get-hotel/:ownerid").post(getHotelDetailByOwnerId);
router.route("/get-rooms/:ownerid").post(getAllRoomDetailByOwnerId);
router.route("/delete-room/:roomid").post(deleteRoomDetailByRoomId);

module.exports = router;
