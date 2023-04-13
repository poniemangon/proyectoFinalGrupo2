const { body } = require('express-validator');
const path = require('path');
const sizeOf = require('image-size');
const fs = require('fs');

 const registerValidation = [
    body('username').notEmpty().withMessage('Usuario no puede estar vacio'),
    body('email').isEmail().withMessage('Ingresar email valido'),
    body('password').isLength({min: 6}).withMessage('La contrasena debe tener 6 caracteres como minimo'),
    body('name').notEmpty().withMessage('Nombre no puede estar vacio'),
    body('user_image').custom(
        (value, {req}) =>
        {
            if (!req.file){
                return true;
            }
            else {
                const file = req.file;
                const readFile = fs.readFileSync(file.path);
                const fileExt = path.extname(file.originalname);
                const extensionesValidas = ['.jpeg', '.png', '.gif', '.jpg'];

                if(!extensionesValidas.includes(fileExt)){
                    throw new Error('Solo es valido JPG, PNG y GIF');
                }
                if (!(sizeOf(readFile).height / sizeOf(readFile).width == 1.0)){
                    throw new Error('La foto de producto debe ser cuadrada');
                }
            }
            return true;

        }
    )


];


module.exports = registerValidation;