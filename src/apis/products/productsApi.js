const db = require("../../database/models");

const productsApi = {
  allProducts: async (req, res) => {
    const products = await db.Product.findAll();
    const categories = await db.ProductCategory.findAll();
    //count
    const count = products.length;

    //countByCategory
    const countByCategory = [];
    for(category of categories)
    {
      const productosByCategory = await db.Product.findAll({where: { id_product_category: category.id }});
      const amountByCategory = productosByCategory.length;
      countByCategory.push({
        category_name: category.category_name,
        amount: amountByCategory
      });
    }

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
