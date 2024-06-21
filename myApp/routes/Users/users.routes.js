const express = require("express");
const userRoutes = express.Router();
const { createUser, userLogin, getAllUsers, userId, updateUser, deleteUser } = require("./users.controller.js");

userRoutes.post("/signup", createUser);
userRoutes.get("/viewAllUsers", getAllUsers)
userRoutes.post("/login", userLogin);
userRoutes.get("/:userId", userId);
userRoutes.patch("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);





module.exports = { userRoutes };