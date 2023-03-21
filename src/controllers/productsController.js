const fs = require("fs");
const path = require("path"); 
const db = require('../database/models/');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const multer = require('multer');
const upload = multer({ dest: 'public/images/products' });
console.log(products);

const productsController = {
	carrito: (req, res) => {
		return res.render('carrito');
	},
	detail: async (req, res) => {
		const id = req.params.id;
		try {
			const product = await db.Product.findByPk(id);
			return res.render('detalle-producto', {product});
		}
		catch (err) {
			return res.redirect('back');
		}
	},
	create: async (req, res) => {
		const categorias = await db.ProductCategory.findAll();
		return res.render('agregar', {categorias});
	},
	store: async (req, res) => {
		try {
			console.log(req.body);
			const product = await db.Product.create({
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				image: req.files.product_image[0].filename,
				banner: req.files.product_banner[0].filename,
				id_product_category: req.body.id_product_category
			});
			return res.redirect('/');
		}
		catch (error) {
			console.error(error);
			return res.redirect('back');
		  }


	},
}

module.exports = productsController;