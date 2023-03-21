const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const products1 = products.slice(products.length-7, products.length).reverse();
const products2 = products.slice(products.length-14, products.length-7).reverse();



const mainController = {
    home: (req,res) => {
        console.log(req.session.user);
        
        return res.render("home-page", {products1, products2} );
    }
};

module.exports = mainController;