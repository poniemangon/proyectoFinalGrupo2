const { body } = require('express-validator');
const path = require('path');

 const validation = [
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
                const fileExt = path.extname(file.originalname);
                console.log(fileExt);
                const extensionesValidas = ['jpeg', 'png', 'gif', '.jpg'];

                if(!extensionesValidas.includes(fileExt)){
                    throw new Error('Solo es valido JPG, PNG y GIF');
                }
            }
            return true;

        }
    )


];


module.exports = validation;