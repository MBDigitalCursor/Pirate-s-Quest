const express = require("express");
const { register, login } = require("../controller/mainController");

const mainRouter = express.Router();

mainRouter.post("/register", register);
mainRouter.post("/login", login);

module.exports = mainRouter;
