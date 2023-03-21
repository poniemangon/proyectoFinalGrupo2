// ************ Require's ************
const express = require("express");
const path = require("path");
const app = express();
const usersRoutes = require('./src/routes/usersRoutes')
const mainRouter = require("./src/routes/mainRoutes");
const productsRouter = require("./src/routes/productsRoutes");
const methodOverride =  require('method-override');
const session = require('express-session');


app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
  });
  

// express session


app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

// ************ Ejs ************
app.set('view engine', 'ejs');
app.set('views','./src/views')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ************ Route System require and use() ************
// set user middelware

const setUser = require('./src/middlewares/setUser');
app.use(setUser);

// Main
app.use("/", mainRouter);
app.get('/carrito', productsRouter  );

//user interface
app.use("/", usersRoutes );


//Products routes
app.use("/products", productsRouter);

console.log('hola');




const productsMiddleware = require('./src/middlewares/setProducts');

app.use(productsMiddleware);

// ************ Server ************
app.use(express.static("public"));
app.listen(3100, () => console.log("Servidor 3100 corriendo"));



