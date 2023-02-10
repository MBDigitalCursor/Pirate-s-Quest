const express = require("express");
const { dropChances, chestOpen } = require("../controller/dropController");
const { register, login, allUsers, addGold, upgrade, userLogged } = require("../controller/mainController");

const mainRouter = express.Router();

mainRouter.get("/allUsers", allUsers);
mainRouter.post("/register", register);
mainRouter.post("/login", login);
mainRouter.post("/calcGold", addGold);
mainRouter.post("/upgrade", upgrade);
mainRouter.post("/userLogged", userLogged);
mainRouter.post("/calcDrop", dropChances);
mainRouter.post("/chestOpen", chestOpen);

module.exports = mainRouter;
