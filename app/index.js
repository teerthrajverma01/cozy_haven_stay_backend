const { userRegister } = require("./controllers/user/userRegister.controller");
const {
  hotelOwnerRegister,
} = require("./controllers/hotel_owner/hotelOwnerRegister.controller");

userRegister({ name: "", email: "", password: "pwd" });
userRegister({ name: "test", email: "test@gmail.com", password: "pwd" });

hotelOwnerRegister({ name: "", email: "", password: "pwd" });
hotelOwnerRegister({ name: "test", email: "test@gmail.com", password: "pwd" });
