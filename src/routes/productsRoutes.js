const express = require("express");
const router = express.Router();
const multer = require('multer')
const productsController = require("../controllers/productsController");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../public/images/products"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })


//Todos los productos
router.get("/", productsController.home);
router.get("/", productsController.carrito);


//Crear un producto
router.get("/create", productsController.create);
router.post('/',upload.single("product_image"), productsController.store); 

//Detalle producto
router.get("/detalle/:id", productsController.detail);

//Editar un producto
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single("product_image"), productsController.update); 
//carrito
router.get('/carrito', productsController.carrito)

module.exports = router;