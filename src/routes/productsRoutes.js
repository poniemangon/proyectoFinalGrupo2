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
router.get("/", productsController.allProducts);
router.get("/productsby/:id", productsController.productsByCategory);


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
router.post("/remove", productsController.removeFromCart);

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

//delete
router.get("/delete/:id", productsController.delete);
router.delete("/delete/:id", productsController.delete);

//searchBar

router.get('/search', productsController.search);
router.get('/search/result', productsController.search)

module.exports = router;
