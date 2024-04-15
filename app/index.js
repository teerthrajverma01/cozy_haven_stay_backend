const { userRegister } = require("./controllers/user/userRegister.controller");

userRegister({ name: "", email: "", password: "pwd" });
userRegister({ name: "test", email: "test@gmail.com", password: "pwd" });
