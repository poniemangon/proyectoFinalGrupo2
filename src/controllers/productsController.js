const fs = require("fs");
const path = require("path");
const db = require("../database/models/");
const multer = require("multer");
const upload = multer({ dest: "public/images/products" });
const { validationResult } = require("express-validator");
const { Op } = require('sequelize');
const validateAdmin = require('../middlewares/validateAdmin');

const productsController = {
  search: async (req, res) => {
    const searchQuery = req.query.search;
    const productsFound = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${searchQuery}%`
        }
      }
    });
    if (productsFound.length > 0) {
      return res.render('busqueda_result', { products: productsFound, busqueda: searchQuery });
    } else {
      return res.render('busqueda_result', { message: `No se ha encontrado ningún producto con ${searchQuery}` });
    }
  },
  carrito: async (req, res) => {
    if(!req.session.carrito){
      req.session.carrito = [];
    }
    const productos = req.session.carrito;
    console.log(productos);
    let amountProductos = 0;
    let totalPrice = 0;
    for(producto of productos){
      const pricePerProduct = producto.price * producto.amount;
      totalPrice += pricePerProduct;
      amountProductos += producto.amount;
    }
    
    return res.render("carrito", { productos, totalPrice, amountProductos  });
  },

  detail: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await db.Product.findByPk(id);
      return res.render("detalle-producto", { product });
    } catch (err) {
      return res.redirect("back");
    }
  },

  addToCart: async (req, res) => {
    if (req.session.user) {
      
    
    const id = req.body.productId;
    const findInCart = req.session.carrito.find(product => product.id == id);
    if(findInCart){
      findInCart.amount += 1;
    }
    else{
      const productInDB = await db.Product.findByPk(id);
      const product = {
        id: productInDB.dataValues.id,
        name: productInDB.dataValues.name,
        description: productInDB.dataValues.description,
        image: productInDB.dataValues.image,
        price: productInDB.dataValues.price,
        id_product_category: productInDB.dataValues.id_product_category,
        banner: productInDB.dataValues.banner,
        amount: 1
      }
      req.session.carrito.push(product);
    }
    }
    return res.redirect("back");
  },

  removeFromCart: async (req, res)=> {
    const id = await req.body.productId;
    const productToRemove = await req.session.carrito.findIndex(product => product.id == id);
    req.session.carrito.splice(productToRemove, 1);
    return res.redirect("back");

  },

  create: async (req, res) => {
    if(!req.session.user)
    {return res.render('404');}
    else{
      const isAdmin = validateAdmin(req.session.user.id_user_category);
      if(isAdmin == false){
        return res.render('404');
      }
    }
    const categorias = await db.ProductCategory.findAll();

    return res.render("agregar", { categorias });
  },

  store: async (req, res) => {
    if(!req.session.user)
    {return res.render('404');}
    else{
      const isAdmin = validateAdmin(req.session.user.id_user_category);
      if(isAdmin == false){
        return res.render('404');
      }
    }
    console.log(req.body, req.file);
    const errors = validationResult(req).array();
    const categorias = await db.ProductCategory.findAll();
    if (!errors.length == 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      console.log(errors);
      return res.render("agregar", { categorias, errors, oldData: req.body });
    } else {
      try {
        // await validateNewProduct(req, res, () => {});
        const product = await db.Product.create({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: req.file.filename,
          banner: "BANNER.png",
          id_product_category: req.body.id_product_category,
        });
        return res.redirect("/");
      } catch (error) {
        console.error(error);
        return res.redirect("back");
      }
    }
  },

  edit: async (req, res) => {
    if(!req.session.user)
    {return res.render('404');}
    else{
      const isAdmin = validateAdmin(req.session.user.id_user_category);
      if(isAdmin == false){
        return res.render('404');
      }
    }
    const categorias = await db.ProductCategory.findAll();
    const id = await req.params.id;
    const product = await db.Product.findOne({ where: { id } });
    if (product) {
      return res.render("editar-producto", { product, categorias });
    } else {
      return res.redirect("/");
    }
  },

  update: async (req, res) => {
    if(req.session.user){
      const isAdmin = validateAdmin(req.session.user.id_user_category);
      if(isAdmin == false){
        return res.render('404');
      }
    }
    console.log(req.body, req.file);
    const errors = validationResult(req).array();
    const categorias = await db.ProductCategory.findAll();
    if (!errors.length == 0) {
      console.log(errors);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      console.log(errors);
      return res.render("agregar", { categorias, errors, oldData: req.body });
    }
    const id = req.params.id;
    const product = await db.Product.findOne({ where: { id } });
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      "products",
      product.image
    );
    if (!errors.length == 0) {
      return res.render("editar-producto", {
        categorias,
        oldData: req.body,
        errors,
      });
    }
    if (req.file) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }

    const newData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.file ? req.file.filename : product.image,
      banner: "BANNER.PNG",
      id_product_category: req.body.id_product_category,
    };
    console.log(newData.image);
    await db.Product.update(newData, { where: { id } });
    return res.redirect(`/products/detail/${id}`);
  },

  delete: async (req, res) => {
    if(req.session.user){
      const isAdmin = validateAdmin(req.session.user.id_user_category);
      if(isAdmin == false){
        return res.render('404');
      }
    }
    const id = req.params.id;
    try {
      // Find the product to delete
      const product = await db.Product.findByPk(id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      console.log(product);
      // Delete the product image and banner files
      const imagePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "images",
        "products",
        product.image
      );
      const bannerPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "images",
        "products",
        product.banner
      );
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
      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res.redirect("back");
    }
  },

  productsByCategory: async (req, res) => {
    const id = req.params.id;
    const category = await db.ProductCategory.findByPk(id);
    const products = await db.Product.findAll({
      where: { id_product_category: id }
    });
    return res.render("productsByCateogory", { products, category });
  },
  allProducts: async (req, res) => {
    const allProducts = await db.Product.findAll();

    return res.render("products", { allProducts });
  },
};

module.exports = productsController;