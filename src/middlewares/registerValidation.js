const { validationResult } = require('express-validator');
const { check, body } = require('express-validator');
// import other required libraries

const validateNewUser = [
    check('username').not().isEmpty().withMessage('Username requerido'),
    check('password').not().isEmpty().withMessage('Password requerido')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('email').isEmail().withMessage('Email invalido'),
    check('name').not().isEmpty().withMessage('Nombre es requerido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('register', { errors: errors.array() });
      }
      next();
    }
  ];

module.exports = validateNewUser;