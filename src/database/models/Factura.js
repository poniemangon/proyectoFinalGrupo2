module.exports = (sequelize, dataTypes) => {
  let alias = "Factura";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    id_user: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    price: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
  };
  let config = {
    tableName: "facturas",
    timestamps: false,
  };

  let Factura = sequelize.define(alias, cols, config);
  return Factura;
};
