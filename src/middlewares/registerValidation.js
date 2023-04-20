const { body } = require('express-validator');
const path = require('path');
const sizeOf = require('image-size');
const fs = require('fs');

 const registerValidation = [
    body('name').notEmpty().withMessage('Nombre no puede estar vacio'),
    body('surname').notEmpty().withMessage('Apellido no puede estar vacio'),
    body('email').isEmail().withMessage('Ingresar email valido'),
    body('password').isLength({min: 6}).withMessage('La contrasena debe tener 6 caracteres como minimo'),
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
                else {
                    const maxRatio = 1.15;
                    const minRatio = 0.85;

                    const imageRatio = sizeOf(readFile).height / sizeOf(readFile).width;
                    if(!(imageRatio <= maxRatio && imageRatio >= minRatio)){
                        throw new Error('La foto de usuario debe ser cuadrada');
                    }
                        
                    }
                }
                return true;
            }
            
        
        
    )


];


module.exports = registerValidation;