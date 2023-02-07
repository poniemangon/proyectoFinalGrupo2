const express = require("express");


const userControllers ={
    login : (req,res)=> res.render('login'),
    register : (req, res) => res.render('register')
}




module.exports = userControllers