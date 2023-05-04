const fs = require("fs");
const path = require("path");
const db = require("../database/models/");
const multer = require("multer");
const upload = multer({ dest: "public/images/products" });
const { validationResult } = require("express-validator");

const productsController = {
  carrito: (req, res) => {
    const productos = req.session.carrito;
    return res.render("carrito", { productos });
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
      console.log("hay user logueado");
    }
    const id = req.body.productId;
    const product = await db.Product.findByPk(id);
    product.dataValues.numeroCarrito = req.session.carrito.length + 1;
    req.session.carrito.push(product.dataValues);
    console.log(req.session.carrito);
    return res.redirect("back");
  },

  create: async (req, res) => {
    const categorias = await db.ProductCategory.findAll();

    return res.render("agregar", { categorias });
  },

  store: async (req, res) => {
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

  casualProducts: async (req, res) => {
    const allProducts = await db.Product.findAll();
    const casualProducts = allProducts.filter(
      (product) => product.id_product_category == 1
    );

    return res.render("productsCasuales", { casualProducts });
  },

  sportingProducts: async (req, res) => {
    const allProducts = await db.Product.findAll();
    const sportingProducts = allProducts.filter(
      (product) => product.id_product_category == 2
    );

    console.log(sportingProducts);

    return res.render("productsDeportivas", { sportingProducts });
  },
  products: async (req, res) => {
    const allProducts = await db.Product.findAll();

    res.render("products", { allProducts });
  },
};

module.exports = productsController;
