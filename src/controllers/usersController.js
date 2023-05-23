const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'public/images/userimages' });
const db = require('../database/models/');
const registerValidation = require('../middlewares/registerValidation');
const { validationResult } = require('express-validator');




const controller = {
  indexUser: (req, res) => {
    
  return res.render('header', {user: req.session.user})
  },
  register: async (req, res)=>{
    if (req.session.user){
      return res.redirect('back');
    }
    const errors = [];
    const oldData = {
    name: '',
    password: '',
    email: '',
    surname: '',
  }
  res.render('register', {errors, oldData});
  },  
  login: (req, res)=>{
      res.render('login');
  },
  logout: async (req, res) => {
    await req.session.destroy();
    return res.redirect('/');
  },
  profile: async (req, res) => {
    
    const id = await req.params.id;
    const userFound = await db.User.findOne({ where: { id } });
    if (userFound) {
    return res.render('profile', {userFound});
    }
    else {
      return res.redirect('/');
    }
  },
  store: async (req, res) => {

    const errors = validationResult(req).array();


    if (errors.length !== 0){
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.render('register', {errors, oldData: req.body});
    }
    else {
    try {
      const newUser = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        surname: req.body.surname,
        image: req.file ? req.file.filename : 'default.jpg'
      };
  
      const existingUser = await db.User.findOne({
        where: { 
          [db.Sequelize.Op.or]: [{ email: newUser.email }] 
        },
      });
  
      if (existingUser) {
        const message = `${newUser.email} ya existe`; 
        return res.render('register', {message}); 
      }
  
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      
      const user = await db.User.create({
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        password: hashedPassword,
        image: newUser.image,
        id_user_category: newUser.name == "admin" ? 2: 1
      });
  
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }},
  loginProcess: async (req, res) => {
    try {
      const { email, password } = req.body;


      const user = await db.User.findOne({ where: { email } });

    
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.render('login', { error: 'Invalid email or password' });
      }


      req.session.user = user;
      const userCategory = await db.UserCategory.findByPk(user.id_user_category);
      req.session.user.dataValues.category = userCategory.category_name;
      
      console.log(req.session.user.dataValues, req.session.user.dataValues.category);
      req.session.user.password = 'hidden';
      console.log('success');
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  editUser: async (req, res) => {
    const id = await req.params.id;
    if(!req.session.user || req.session.user.id != id){
      return res.render('denegado');
    }
  
    
    const picUser = await db.User.findOne({ where: { id } });
    if (picUser) {
    return res.render('changeUserForm', {picUser});
    }
    else {
      return res.redirect('/');
    }
  },
  editUserProcess: async (req, res) => {
    const id = await req.params.id;
    if(!req.session.user || req.session.user.id != id){
      return res.render('denegado');
    }
 
    
    const picUser = await db.User.findOne({ where: { id } });

    const imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'userimages', picUser.dataValues.image);
    if (req.file) {
	
		  fs.unlink(imagePath, (err) => {
			if (err) {
			  console.error(err);
			}
		  });
		}
		console.log(picUser.dataValues.image);
    if(req.body.email != req.session.user.email){
      const emailExists = await db.User.findOne({ where: {email: req.body.email} });
      if (emailExists){
        console.log(emailExists);
        return res.redirect('back');
      }
    }
    


    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newData = await {
      password: hashedPassword,
      email: req.body.email,
      name: req.body.name,
      image: req.file ? req.file.filename : picUser.dataValues.image
      
    };
    await db.User.update(newData, { where: { id: id } });

    
    req.session.user.username = newData.username;
    req.session.user.email = newData.email;
    req.session.user.name = newData.name;

    return res.redirect('/');

  },
  search: async (req, res) => {
    const username = await req.body.busqueda;
    console.log(req.body.busqueda);
    const userFound = await db.User.findOne({ where: { username } });
    if (userFound) {
      return res.redirect(`/profile/${userFound.id}`);
    }
    else {
      return res.redirect('back');
    }
  },
  deleteUser: async (req, res) => {
    const id = await req.params.id;
    if(!req.session.user || req.session.user.id != id){
      return res.render('denegado');
    }
    try {
      const user = await db.User.findOne({ where: { id } });
      if (!user) {
        return res.redirect('/');
      }
      const imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'userimages', user.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await db.User.destroy({ where: { id } });
      if (req.session.user.id == id) {
        await req.session.destroy();
      }
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  facturasByUser: async (req, res) => {
    const id = req.params.id;
    const facturas = await db.Factura.findAll({where: {id_user: id}});

    return res.render('facturas', {facturas: facturas});
  }
  
};









module.exports = controller;

