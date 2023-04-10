module.exports = (sequelize, DataTypes) => {
    const Factura_Producto = sequelize.define(
      'factura_product',
      {
        cantidad: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        precio: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        tableName: 'factura_product',
        timestamps: false,
      }
    );
  
    Factura_Producto.associate = function (models) {
      Factura_Producto.belongsTo(models.Factura, {
        foreignKey: 'factura_id',
      });
      Factura_Producto.belongsTo(models.Product, {
        foreignKey: 'producto_id',
      });
    };
  
    return Factura_Producto;
  };