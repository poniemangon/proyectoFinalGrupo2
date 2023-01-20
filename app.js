const express = require("express");
const path = require("path");
const app = express();


app.set('view engine', 'ejs');

app.set('views','./views')

app.get('/', (req, res) => {
  res.render('home-page')
});
app.get('/register', (req, res) => {
  res.render('register')
});

app.get('/login', (req, res) => {
  res.render('login')
});
app.get('/product', (req, res) => {
  res.render('detalle-producto')
});
app.get('/carrito', (req, res) => {
  res.render('carrito')
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

app.listen(3000, () => console.log("Servidor 3000 corriendo"));

app.use(express.static("public"));

