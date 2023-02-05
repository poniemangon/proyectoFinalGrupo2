const express = require("express");
const router = express.Router();

const productsController = require("../controllers/productsController");

//Todos los productos
router.get("/", productsController.home);

//Crear un producto
router.get("/create", productsController.create);
router.post("/", productsController.store)

//Detalle producto
router.get("/products/:id", productsController.detail);

//Editar un producto


module.exports = router;