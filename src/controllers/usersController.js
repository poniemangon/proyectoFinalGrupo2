const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'public/images/userimages' });
const db = require('../database/models/');
const { validateNewUser } = require('../middlewares/registerValidation');




const controller = {
  indexUser: (req, res) => {
    
  return res.render('header', {user: req.session.user})
  },
  register: async (req, res)=>{
    const errors = [];
  res.render('register', {errors});
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
    try {
      const newUser = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        image: req.file ? req.file.filename : 'default.jpg'
      };
  
      const existingUser = await db.User.findOne({
        where: { 
          [db.Sequelize.Op.or]: [{ username: newUser.username }, { email: newUser.email }] 
        },
      });
  
      if (existingUser) {
        const message = `${newUser.username} ya existe`; 
        return res.render('register', {message}); 
      }
  
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
  
      const user = await db.User.create({
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        image: newUser.image,
        id_user_category: 1
      });
  
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  loginProcess: async (req, res) => {
    try {
      const { username, password } = req.body;


      const user = await db.User.findOne({ where: { username } });

    
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.render('login', { error: 'Invalid username or password' });
      }


      req.session.user = user;
      req.session.user.password = 'hidden';
      console.log('success');
      console.log(req.session.user.username);
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  editUser: async (req, res) => {
    
    const id = await req.params.id;
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


    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newData = await {
      username: req.body.username,
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
  }
  
};









module.exports = controller;

