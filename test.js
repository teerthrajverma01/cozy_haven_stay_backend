const {
  addNewHotelOwner,
  getHotelOwnerById,
  getAllHotelOwner,
  deleteHotelOwnerById,
} = require("./src/services/hotel/hotel_owner_detail.service");
const {
  addNewUser,
  getUserById,
  getAllUser,
  deleteUserById,
  updateUser,
} = require("./src/services/user/user_detail.service");

const addNewHotelOwnerFun = async () => {
  const result = await addNewHotelOwner({
    owner_name: "testname",
    password: "testpassword",
    email: "testemail",
    gender: "MALE",
    contact_no: "testcontactno",
    address: "testaddress",
  });
  console.log(result);
};

const getHotelOwnerByIdFun = async (id) => {
  const [result] = await getHotelOwnerById(id);
  console.log(result);
};
const getAllHotelOwnerFun = async () => {
  const result = await getAllHotelOwner();
  for (let item of result) {
    console.log(item);
  }
};
const deleteHotelOwnerByIdFun = async (id) => {
  const result = await deleteHotelOwnerById(id);
  console.log(result);
};
// addNewHotelOwnerFun();
// getHotelOwnerByIdFun(1);
// getAllHotelOwnerFun();
// deleteHotelOwnerByIdFun(1);

// ***************************************************
const addNewUserFun = async () => {
  const result = await addNewUser({
    user_name: "testname2",
    password: "testpassword2",
    email: "testemail2",
    gender: "MALE",
    contact_no: "testcontactno2",
    address: "testaddress2",
  });
  console.log(result);
};
const getUserByIdFun = async (id) => {
  const result = await getUserById(id);
  console.log(result);
};
const getAllUserFun = async () => {
  const result = await getAllUser();
  for (let item of result) {
    console.log(item);
  }
};
const deleteUserByIdFun = async (id) => {
  const result = await deleteUserById(id);
  console.log(result);
};
const updateUserFun = async () => {
  const result = await updateUser({
    user_name: "testname1",
    password: "testpassword1",
    gender: "MALE",
    contact_no: "testcontactno1",
    address: "testaddress1",
    user_id: 1,
  });
  console.log(result);
};

// addNewUserFun();
// getUserByIdFun(2);
// getAllUserFun();

// deleteUserByIdFun(1);

// updateUserFun();
