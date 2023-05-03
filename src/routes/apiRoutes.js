const usersApi = require('../apis/users/usersApi');
const express = require('express');
const router = express.Router();

router.get("/users/all", usersApi.allUsers);
router.get("/users/:id", usersApi.userByID);

module.exports = router;