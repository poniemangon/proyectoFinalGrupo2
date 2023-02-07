const fs = require("fs");
const path = require("path"); 

// const productsFilePath = path.join(__dirname, '???????');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    carrito : (req, res) =>res.render('carrito'),
    home: (req,res) =>  res.render("products"),
    create: (req,res) => res.render("agregar"),
    store: (req,res) => {
        console.log(req.body)
        return res.redirect("products")
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
    }

}

module.exports = productsController;