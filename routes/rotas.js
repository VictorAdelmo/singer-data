const express = require("express");
const router = express.Router();
const multer = require("multer");
const controllerSpotify = require("../controller/controllerSpotify");
const controllerCantor = require("../controller/controllerSinger");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.get("/callback/",controllerSpotify.callBack)
router.get("/",controllerSpotify.scopesConfig)
router.get("/pesquisar",controllerSpotify.pesquisarArtista);
router.post("/inserir-img",controllerCantor.analyzeSinger);

module.exports = router;