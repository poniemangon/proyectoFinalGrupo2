const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const db = require('../database/models/');



const mainController = {
    home: async (req,res) => {
        const products = await db.Product.findAll();
        const products1 = await products.slice(products.length-7, products.length).reverse();
        const products2 = await products.slice(products.length-14, products.length-7).reverse();
        
        return res.render("home-page", {products1, products2} );
    }
};

module.exports = mainController;