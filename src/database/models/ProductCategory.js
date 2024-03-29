module.exports = (sequelize, dataTypes) => {
  let alias = "ProductCategory";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    category_name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
  };
  let config = {
    tableName: "product_categories",
    timestamps: false,
  };

  let ProductCategory = sequelize.define(alias, cols, config);

  ProductCategory.associate = function (models) {
    ProductCategory.hasMany(models.Product, {
      as: "products",
      foreignKey: "id_product_category",
    });
  };

  return ProductCategory;
};
