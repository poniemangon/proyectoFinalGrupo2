const express = require("express");
const router = express.Router();
const multer = require("multer");
const productsController = require("../controllers/productsController");
const path = require("path");
const productAddValidation = require("../middlewares/productAddValidation");
const productEditValidation = require("../middlewares/productEditValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/products"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

//Todos los productos

// router.get("/", productsController.carrito);
router.get("/", productsController.products);
router.get("/casuales", productsController.casualProducts);
router.get("/deportivas", productsController.sportingProducts);

//Crear un producto
router.get("/create", productsController.create);
router.post(
  "/store",
  upload.single("product_image"),
  productAddValidation,
  productsController.store
);

//Detalle producto
router.get("/detail/:id", productsController.detail);
router.post("/add", productsController.addToCart);

//Editar un producto
router.get("/edit/:id", productsController.edit);
router.put(
  "/edit/:id",
  upload.single("product_image"),
  productEditValidation,
  productsController.update
);
// carrito
router.get("/carrito", productsController.carrito);
router.get("/delete/:id", productsController.delete);
router.delete("/delete/:id", productsController.delete);

// delete
// router.delete('/delete/:id', productsController.destroy);
// router.get('/delete/:id', productsController.destroy);

module.exports = router;
