const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

console.log('routes')
router.get("/", productsController.home);
router.get("/create", productsController.create);

module.exports = router;