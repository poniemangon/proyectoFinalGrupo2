const { body } = require('express-validator');
const path = require('path');
const sizeOf = require('image-size');
const fs = require('fs');

 const productEditValidation = [
    body('name').isLength({min:1, max:50}).withMessage('Nombre no puede estar vacio o es muy largo'),
    body('description').isLength({min:1, max:255}).withMessage('La descripcion no puede estar vacia o es muy larga (mas de 255 caracteres)'),
    body('product_image').custom(
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
                        throw new Error('La foto de producto debe ser cuadrada');
                    }
                        
                    }
                }
                return true;
            }
            
        
        
    )
    
    


];


module.exports = productEditValidation;