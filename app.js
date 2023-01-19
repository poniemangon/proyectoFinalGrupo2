const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/register.html"))
})

app.listen(3041, () => console.log("Servidor 3041 corriendo"));