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

  Factura.associate = function (models) {
    Factura.belongsTo(models.User, {
      as: "users",
      foreignKey: "id_user",
    });


    Factura.belongsToMany(models.Product, {
      as: "products",
      through: "factura_product",
      foreignKey: "id_factura",
      otherKey: "id_product",
      timestamps: false,
    });
  };

  return Factura;
};
