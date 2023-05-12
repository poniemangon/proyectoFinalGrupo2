const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");


router.get("/", mainController.home);
router.post("/destacado1", mainController.setProductoDestacado1);
router.post("/destacado2", mainController.setProductoDestacado2);



module.exports = router;