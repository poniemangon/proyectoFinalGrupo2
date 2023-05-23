const facturaController = require("../controllers/facturaController");
const express = require("express");
const router = express.Router();


router.post("/create", facturaController.createFactura);
router.get("/factura/:id", facturaController.getFactura);


module.exports = router;