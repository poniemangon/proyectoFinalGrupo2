const fs = require("fs");
const path = require("path"); 

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

function productsMiddleware(req, res, next) {
  res.locals.products = products;
  next();
}

module.exports = productsMiddleware;