const { validationResult } = require('express-validator');
const { check, body } = require('express-validator');
const db = require('../database/models')
// import other required libraries

const validateNewProduct = [
    check('name').not().isEmpty().withMessage('Nombre requerido'),
    check('description').not().isEmpty().withMessage('Descripcion requerida'),
    async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const categorias = await db.ProductCategory.findAll();
        return res.render('agregar', { errors: errors.array(), categorias});
      }
      next();
    }
  ];

module.exports = validateNewProduct;