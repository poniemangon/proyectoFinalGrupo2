const express = require("express");
const router = express.Router();
const multer = require('multer')
const productsController = require("../controllers/productsController");
const path = require('path');
const productAddValidation = require("../middlewares/productAddValidation")


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

router.get("/", productsController.carrito);


//Crear un producto
router.get("/create", productsController.create);
router.post('/store', upload.fields([{ name: 'product_image', maxCount: 1 },{ name: 'product_banner', maxCount: 1 }]), productAddValidation, productsController.store); 

//Detalle producto
router.get("/detail/:id", productsController.detail);
router.post("/add", productsController.addToCart);

//Editar un producto
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.fields([{ name: 'product_image', maxCount: 1 },{ name: 'product_banner', maxCount: 1 }]), productsController.update); 
// carrito
router.get('/carrito', productsController.carrito);
router.get('/delete/:id', productsController.delete);
router.delete('/delete/:id', productsController.delete);


// delete
// router.delete('/delete/:id', productsController.destroy);
// router.get('/delete/:id', productsController.destroy);

module.exports = router;