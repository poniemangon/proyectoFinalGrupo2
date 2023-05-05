const db = require("../../database/models");

const productsApi = {
  allProducts: async (req, res) => {
    const products = await db.Product.findAll();

    //count
    const count = products.length;

    //countByCategory
    const catCasual = products.filter(
      (product) => product.id_product_category == 1
    );
    const catDeportiva = products.filter(
      (product) => product.id_product_category == 2
    );
    const countByCategory = {
      categoriaCasual: catCasual.length,
      categoriaDeportiva: catDeportiva.length,
    };

    //productsArr
    const productsArr = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        relaciones: [],
        detail: `http://localhost:3100/products/detail/${product.id}`,
      };
    });

    return res.json({ count, countByCategory, productsArr });
  },

  oneProduct: async (req, res) => {
    const product = await db.Product.findByPk(req.params.id);

    return res.json({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      relaciones: [],
      image: `http://localhost:3100/images/products/${product.image}`,
    });
  },
};

module.exports = productsApi;
