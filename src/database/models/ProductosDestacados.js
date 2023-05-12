module.exports = (sequelize, dataTypes) => {
    let alias = "ProductosDestacados";
    let cols = {
      id: {
        type: dataTypes.INTEGER(10),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      product_id: {
        type: dataTypes.INTEGER(10),
        allowNull: false,
      }
    };
    let config = {
      tableName: "productos_destacados",
      timestamps: false,
    };
  
    let ProductosDestacados = sequelize.define(alias, cols, config);
  
    return ProductosDestacados;
  };
  