const db = require('../database/models');

const categoriesMiddleware = async (req, res, next) => {
  try{
  const categories = await db.ProductCategory.findAll();
  res.locals.categories = categories;
  next();
  }
  catch (error){
    return res.render('home-page', { error: 'Database disconnected' });
  }
}

module.exports = categoriesMiddleware;