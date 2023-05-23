const db = require('../database/models/');

const facturaController = {
  createFactura: async (req, res) => {
    console.log(req.session.user);
    const id_usuario = req.session.user.id;
    const productsInCarrito = req.session.carrito;
    const factura = await db.Factura.create({
      id_user: id_usuario,
      price: 0,
    });
    for (const product of productsInCarrito) {
        await db.Factura_Product.create({
            id_factura: factura.id,
            id_product: product.id,
            quantity: product.amount,
            price: product.amount * product.price, // Set the price value
          });
    }
    const productsInFactura = await db.Factura_Product.findAll({
      where: {
        id_factura: factura.id, // Use the correct field name
      },
    });
    let priceInFactura = 0;
    for (const product of productsInFactura) {
      priceInFactura += product.price; // Use the correct field name
    }
    await db.Factura.update({ price: priceInFactura }, { where: { id: factura.id } });

    req.session.carrito = [];

    return res.redirect('/');
  },
  getFactura: async (req, res) => {
    const id = req.params.id;
    const factura = await db.Factura.findByPk(id);

    const productsArray = await db.Factura_Product.findAll({where: {id_factura: id}});
    let productosInFactura = [];

    for (producto of productsArray){
        const product = await db.Product.findByPk(producto.id_product);
        const productoInFactura = {
            name: product.name,
            price: producto.price,
            amount: producto.quantity
        }
        productosInFactura.push(productoInFactura);
    }


    return res.render('factura', {productosInFactura, factura});
  }

};

module.exports = facturaController;
