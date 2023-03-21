const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
const bcrypt = require("bcrypt");
const multer = require('multer');
const upload = multer({ dest: 'public/images/userimages' });
const db = require('../database/models/');




const controller = {
  indexUser: (req, res) => {
    
  return res.render('header', {user: req.session.user})
  },
  register: (req, res)=>{
  res.render('register');
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
        name: req.body.name
      }
      

      // Check if user already exists
      const existingUser = await db.User.findOne({
        where: { 
          [db.Sequelize.Op.or]: [{ username: newUser.username }, { email: newUser.email }] 
        },
      });

      if (existingUser) {
        return res.redirect('back');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(newUser.password, 10);

      // Create the user
      const user = await db.User.create({
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
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

      // Find the user by their username
      const user = await db.User.findOne({ where: { username } });

      // If the user doesn't exist or the password is incorrect, show an error message
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.render('login', { error: 'Invalid username or password' });
      }

      // If the user exists and the password is correct, log them in and redirect to the home page
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newData = await {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      name: req.body.name,
      
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
  }
  
};









module.exports = controller;

