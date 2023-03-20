module.exports = (sequelize, dataTypes) => {
  let alias = "FacturaProduct";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    id_factura: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    id_product: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
  };
  let config = {
    tableName: "factura_product",
    timestamps: false,
  };

  let FacturaProduct = sequelize.define(alias, cols, config);

  FacturaProduct.associate = function (models) {
    FacturaProduct.belongsTo(models.Factura, {
      as: "facturas",
      foreignKey: "id_factura",
    });

    FacturaProduct.belongsTo(models.Product, {
      as: "products",
      foreignKey: "id_product",
    });
  };

  return FacturaProduct;
};
