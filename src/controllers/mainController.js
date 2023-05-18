const path = require("path");
const fs = require("fs");
const productsFilePath = path.join(__dirname, "../data/products.json");
const db = require("../database/models/");
const validateAdmin = require('../middlewares/validateAdmin');

const mainController = {
  home: async (req, res) => {
    if(req.session.user){
      const nashe = req.session.user;
      console.log(nashe);
    }
    if (!req.session.carrito) {
      req.session.carrito = [];
    }
    console.log(req.session.carrito);
    try {
      const products = await db.Product.findAll();
      const productosDestacados = await db.ProductosDestacados.findAll();
      let destacados = [];
      for (producto of productosDestacados){
        const destacado = products.find(product => producto.product_id == product.id);
        destacados.push(destacado);
      }

   

      const products1 = await products;

      return res.render("home-page", { products1, destacados });
    } catch (error) {
      return res.render("home-page", { error: "Database desconectada" });
    }
  },
  setProductoDestacado: async (req, res) => {
    if (req.session.user) {
      const isAdmin = validateAdmin(req.session.user.id_user_category);
      if (isAdmin == false) {
        return res.render("404");
      }
    }
    const product_id = req.body.id_destacado;
    console.log(product_id);
    const newData = {product_id: product_id};
    await db.ProductosDestacados.update(newData, { where: { id: req.body.pk_destacado } });

    return res.redirect('/');
  },
};

module.exports = mainController;
