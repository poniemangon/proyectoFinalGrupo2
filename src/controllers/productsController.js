const fs = require("fs");
const path = require("path"); 
const db = require('../database/models/');
const multer = require('multer');
const upload = multer({ dest: 'public/images/products' });



const productsController = {
	carrito: (req, res) => {
		const productos = req.session.carrito;
		return res.render('carrito', {productos});
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
	addToCart: async (req, res) => {
		if (req.session.user){
			console.log('hay user logueado');

			
		}

		
		const id = req.body.productId;
		const product = await db.Product.findByPk(id);
		product.dataValues.numeroCarrito = (req.session.carrito.length + 1);
		req.session.carrito.push(product.dataValues);
		console.log(req.session.carrito);
		return res.redirect('back');
		
	},
	create: async (req, res) => {
		const categorias = await db.ProductCategory.findAll();
		const errors = [];
		return res.render('agregar', {categorias, errors});
	},
	store: async (req, res) => {
		try {
			// await validateNewProduct(req, res, () => {});
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
	edit: async (req, res) => {
		const categorias = await db.ProductCategory.findAll();
		console.log(categorias);
		const id = await req.params.id;
		const product = await db.Product.findOne({ where: { id } });
		if (product) {
		return res.render('editar-producto', {product, categorias});
		}
		else {
		  return res.redirect('/');
		}
	},
	update: async (req, res) => {
		const id = req.params.id;
		const product = await db.Product.findOne({ where: { id } });
		const imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'products', product.image);
		const bannerPath = path.join(__dirname, '..', '..', 'public', 'images', 'products', product.banner);
	  
		if (req.files.product_image) {
			console.log(req.files.product_image);
		  fs.unlink(imagePath, (err) => {
			if (err) {
			  console.error(err);
			}
		  });
		}
		
		if (req.files.product_banner) {
		  fs.unlink(bannerPath, (err) => {
			if (err) {
			  console.error(err);
			}
		  });
		}
	  
		const newData = {
		  name: req.body.name,
		  description: req.body.description,
		  price: req.body.price,
		  image: req.files.product_image ? req.files.product_image[0].filename : product.image,
		  banner: req.files.product_banner ? req.files.product_banner[0].filename : product.banner,
		  id_product_category: req.body.id_product_category
		};
		console.log(newData.image);
		await db.Product.update(newData, { where: { id } });
		return res.redirect(`/products/detail/${id}`);
	  },
	  delete: async (req, res) => {
		const id = req.params.id;
		try {
		  // Find the product to delete
		  const product = await db.Product.findByPk(id);
		  if (!product) {
			return res.status(404).send('Product not found');
		  }
		  console.log(product);
		  // Delete the product image and banner files
		  const imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'products', product.image);
		  const bannerPath = path.join(__dirname, '..', '..', 'public', 'images', 'products', product.banner);
		  fs.unlink(imagePath, (err) => {
			if (err) {
			  console.error(err);
			}
		  });
		  fs.unlink(bannerPath, (err) => {
			if (err) {
			  console.error(err);
			}
		  });
	
		  // Delete the product from the database
		  await product.destroy();
		  return res.redirect('/');
		} catch (error) {
		  console.error(error);
		  return res.redirect('back');
		}
	  }
	};

	  
	


module.exports = productsController;