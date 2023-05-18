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
    const productsArr = products.map( (product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        category: categories.find(category => category.id == product.id_product_category).category_name,
        image: `http://localhost:3100/images/products/${product.image}`,
        detail: `http://localhost:3100/products/detail/${product.id}`,
      };
    });

    return res.json({ count, countByCategory, productsArr, categories });
  },

  oneProduct: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      const categoryOfProduct = await db.ProductCategory.findByPk(product.id_product_category);
      return res.json({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: categoryOfProduct.category_name,
        image: `http://localhost:3100/images/products/${product.image}`,
      });
    }
    catch (err){
      return res.json({
        error: "Product not found"
      })
    }

  },
};

module.exports = productsApi;
