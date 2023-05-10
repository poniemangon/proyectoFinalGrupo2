// ************ Require's ************
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const usersRoutes = require("./src/routes/usersRoutes");
const mainRouter = require("./src/routes/mainRoutes");
const productsRouter = require("./src/routes/productsRoutes");
// const usersApiRoutes = require('./src/routes/apiRoutes');
const apiRoutes = require("./src/routes/apiRoutes");
const methodOverride = require("method-override");
const session = require("express-session");
const bodyParser = require("body-parser");
const categories = require("./src/middlewares/categories");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

// express session

app.use(
  session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

// ************ Ejs ************
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ************ Route System require and use() ************
// set user middelware

const setUser = require("./src/middlewares/setUser");
app.use(setUser);
app.use(categories);
// Main
app.use("/", mainRouter);
app.get("/carrito", productsRouter);

//user interface
app.use("/", usersRoutes);

//Products routes
app.use("/products", productsRouter);

//API routes
// app.use("/api", usersApiRoutes );
app.use("/api", apiRoutes);

// ************ Server ************
app.use(express.static("public"));
app.listen(3100, () => console.log("Listening on port 3100"));

//Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).render("404");
});
