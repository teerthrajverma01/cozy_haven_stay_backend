const bcrypt = require("bcrypt");

module.exports.isPasswordCorrect = async (password) => {
  return await bcrypt.compare(password, this.password);
};

module.exports.encryptPassword = (inputPassword) => {
  return bcrypt.hash(inputPassword, 10);
};
