// ************ Require's ************
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const setUser = require('../middlewares/setUser');

// multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../../public/images/userimages"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
const upload = multer({ storage: storage });

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register',  usersController.register);
router.post('/register', upload.single('user_image'), usersController.store);
router.get('/login', usersController.login);
router.post('/login', usersController.loginProcess);
router.get('/edituser/:id',  usersController.editUser);
router.put('/edituser/:id', upload.single('user_image'), usersController.editUserProcess);
router.get('/profile/:id', usersController.profile); 
router.get('/logout', usersController.logout); 
router.post('/search', usersController.search);






module.exports = router;