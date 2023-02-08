// ************ Require's ************
const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require('./src/routes/usersRoutes')
const mainRouter = require("./src/routes/mainRoutes");
const productsRouter = require("./src/routes/productsRoutes");
const methodOverride =  require('method-override');


app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '../public')));
// ************ Ejs ************
app.set('view engine', 'ejs');
app.set('views','./src/views')

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// ************ Route System require and use() ************

// Main
app.use("/", mainRouter);
app.get('/carrito', productsRouter  );

//user interface
app.use("/", userRoutes );


//Products routes
app.use("/products", productsRouter);


// ************ Server ************
app.use(express.static("public"));
app.listen(3100, () => console.log("Servidor 3100 corriendo"));
