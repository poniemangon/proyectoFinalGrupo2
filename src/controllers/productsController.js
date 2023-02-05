const fs = require("fs");
const path = require("path"); 

// const productsFilePath = path.join(__dirname, '???????');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    home: (req,res) => {
        return res.render("products")
    },
    create: (req,res) => {
        return res.render("agregar")
    },
    store: (req,res) => {
        console.log(req.body)
        return res.redirect("products")
    },
    detail: (req,res) => {
        const id = req.params.id; 
        const product = products.find(product => product.id == id);
        return res.render("detalle-producto", {product})                  
    }

}

module.exports = productsController;