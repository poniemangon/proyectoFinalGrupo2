const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/products.json');
const db = require('../database/models/');




const mainController = {
    home: async (req,res) => {
        const products = await db.Product.findAll();
        const bannerProduct = await db.Product.findByPk(12);
        const products1 = await products.slice(products.length-7, products.length).reverse();
        const categories = await db.ProductCategory.findAll();
        
        console.log(bannerProduct.dataValues);
        return res.render("home-page", {products1,  bannerProduct, categories} );
    },
};

module.exports = mainController;