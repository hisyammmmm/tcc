import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  loginHandler,
  logout
} from "../controller/UserController.js";

import {verifyToken} from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";

const router = express.Router();

//endpoint akses token
router.get('/token', refreshToken);
//endpoin auth
router.post('/login', loginHandler);
router.post('/logout',verifyToken, logout);

//endpoint data biasa
router.post("/register", createUser); //tambah user
router.get("/users", getUsers);
router.get("/users/:id",getUserById);
router.put("/edit-user/:id",updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
