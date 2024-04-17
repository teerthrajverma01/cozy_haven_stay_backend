const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/dbconfig");

const Admin = db.define(
  "admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    admin_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    admin_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    admin_phoneno: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    tableName: "admin",
  }
);

module.exports = Admin;
