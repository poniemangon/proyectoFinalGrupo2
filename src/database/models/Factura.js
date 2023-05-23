module.exports = (sequelize, DataTypes) => {
  const Factura = sequelize.define(
    'Factura',
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
    },
    {
      tableName: 'facturas',
      timestamps: false,
    }
  );

  Factura.associate = function (models) {
    Factura.belongsTo(models.User, {
      as: 'users',
      foreignKey: 'id_user',
    });

    Factura.hasMany(models.Factura_Product, {
      foreignKey: 'id_factura',
    });
  };

  return Factura;
};
