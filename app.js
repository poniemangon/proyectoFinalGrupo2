const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});

app.listen(3000, () => console.log("Servidor 3000 corriendo"));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/detalle-producto.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home-page.html"));
});