const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const db = require('../database/models/');




const mainController = {
    home: async (req,res) => {
        if(!req.session.carrito){
            req.session.carrito = [];
          }
        console.log(req.session.carrito);
        const products = await db.Product.findAll();

        const products1 = await products.slice(products.length-8, products.length).reverse();

        

        return res.render("home-page", {products1} );
    },
};

module.exports = mainController;