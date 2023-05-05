const usersApi = require("../apis/users/usersApi");
const productsApi = require("../apis/products/productsApi");
const express = require("express");
const router = express.Router();

//EndPoints para users
router.get("/users/all", usersApi.allUsers);
router.get("/users/:id", usersApi.userByID);

//EndPoints para products
router.get("/products/all", productsApi.allProducts);
router.get("/products/:id", productsApi.oneProduct);

module.exports = router;
