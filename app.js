// ************ Require's ************
const express = require("express");
const path = require("path");
const app = express();

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
app.use("/products", productsRouter);

app.get('/register', (req, res) => {
  res.render('register')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/carrito', (req, res) => {
  res.render('carrito')
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

//Products

// ************ Server ************
app.use(express.static("public"));
app.listen(3000, () => console.log("Servidor 3000 corriendo"));



