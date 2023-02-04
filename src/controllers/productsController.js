const productsController = {
    home: (req,res) => {
        console.log('contoller products')
        return res.render("products")
    },
    create: (req,res) => {
        return res.render("agregar")
    }
}

module.exports = productsController;