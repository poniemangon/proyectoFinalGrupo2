module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: dataTypes.BLOB,
      allowNull: true,
    },
    price: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    id_product_category: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
    banner: {
      type: dataTypes.BLOB,
      allowNull: true,
    },
  };
  let config = {
    tableName: "products",
    timestamps: false,
  };

  let Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.hasMany(models.FacturaProduct, {
      as: "factura_product",
      foreignKey: "id_product",
    });

    Product.belongsTo(models.ProductCategory, {
      as: "product_categories",
      foreignKey: "id_product_category",
    });

    Product.belongsToMany(models.Factura, {
      as: "facturas",
      through: "factura_product",
      foreignKey: "id_product",
      otherKey: "id_factura",
      timestamps: false,
    });
  };

  return Product;
};
