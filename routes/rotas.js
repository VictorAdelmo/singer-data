const express = require("express");
const router = express.Router();
const controllerSpotify = require("../controller/controllerSpotify");
const controllerCantor = require("../controller/controllerSinger");
require("dotenv").config();

router.get("/callback/",controllerSpotify.callBack)
router.get("/loginSpotify",controllerSpotify.loginSpotify)
router.post("/inserir-img",controllerCantor.analyzeSinger);

module.exports = router;