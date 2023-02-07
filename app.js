// ************ Require's ************
const express = require("express");
const path = require("path");
const app = express();
const userRoutes = require('./src/routes/usersRoutes')
const mainRouter = require("./src/routes/mainRoutes");
const productsRouter = require("./src/routes/productsRoutes");


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
app.get("/register", userRoutes );
app.get('/login', userRoutes);

//Products routes
app.use("/products", productsRouter);


// ************ Server ************
app.use(express.static("public"));
app.listen(3000, () => console.log("Servidor 3000 corriendo"));



