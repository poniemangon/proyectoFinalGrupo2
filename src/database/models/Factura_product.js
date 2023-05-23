module.exports = (sequelize, DataTypes) => {
  const Factura_Product = sequelize.define(
    'Factura_Product',
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_factura: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'factura_product',
      timestamps: false,
    }
  );

  Factura_Product.associate = function (models) {
    Factura_Product.belongsTo(models.Factura, {
      foreignKey: 'id_factura',
    });
    Factura_Product.belongsTo(models.Product, {
      foreignKey: 'id_product',
    });
  };

  return Factura_Product;
};
