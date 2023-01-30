const express = require("express");
const { test } = require("../controller/mainController");

const mainRouter = express.Router();

mainRouter.post("/test", test);

module.exports = mainRouter;
