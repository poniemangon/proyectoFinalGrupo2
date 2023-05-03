module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    id: {
      type: dataTypes.INTEGER(10),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    surname: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(150),
      allowNull: false,
    },
    user_image: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    id_user_category: {
      type: dataTypes.INTEGER(10),
      allowNull: true,
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };

  let User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.UserCategory, {
      as: "user_categories",
      foreignKey: "id_user_category",
    });

    User.hasMany(models.Factura, {
      as: "facturas",
      foreignKey: "id_user",
    });
  };

  return User;
};
