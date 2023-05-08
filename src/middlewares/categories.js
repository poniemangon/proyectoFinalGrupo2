const db = require('../database/models');

const categoriesMiddleware = async (req, res, next) => {
  const categories = await db.ProductCategory.findAll();
  res.locals.categories = categories;
  next();
}

module.exports = categoriesMiddleware;