import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Membuat tabel "user"
const User = db.define(
  "user", // Nama Tabel
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;
