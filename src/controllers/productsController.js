const fs = require("fs");
const path = require("path"); 

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
console.log(products);

const productsController = {
    carrito : (req, res) =>res.render('carrito'),
    home: (req,res) =>  res.render("products"),
    create: (req,res) => {return res.render("agregar");},
	store: (req, res) => {
		const products = getProductList(productsFilePath);
		const product = {
			id: products.length > 0 ? products[products.length -1].id + 1 : 1,
			name: req.body.name,
            description: req.body.description,
			category: req.body.category,
			price: Number(req.body.price),
			image: req.file ? req.file.filename : "default.jpg",
		}
        console.log(product);
		products.push(product);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		return res.redirect("/products");
	},
    detail: (req,res) => {
        const id = req.params.id; 
        const product = products.find(product => product.id == id);
        return res.render("detalle-producto", {product})                  
    },
    edit: (req,res) => {
        const id = req.params.id;
        const product = products.find(product => product.id == id);
        res.render("editar-producto", {product})
    },
    update: (req, res) => {
		const id = req.params.id;
		
		const product = {
			id,
			...req.body,
			image: req.file ? req.file.filename : "default.jpg",
		}
		guardarProducto(product)
		return res.redirect("/products");
    },
	
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		eliminarProducto(req.params.id);
		return res.redirect("/products");
	}
}

function guardarProducto(productToStore) {

	const products = getProductList(productsFilePath);

	const productList = products.map(prod => {
		if(prod.id == productToStore.id) {
			return productToStore
		}
		return prod;
	});

	fs.writeFileSync(productsFilePath, JSON.stringify(productList, null, 2));
}

function getProductList(path) {
	return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

module.exports = productsController;