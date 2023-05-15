const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");


router.get("/", mainController.home);
router.post("/destacado", mainController.setProductoDestacado);




module.exports = router;