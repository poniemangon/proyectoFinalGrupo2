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
    first_name: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
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
    image: {
      type: dataTypes.BLOB,
      allowNull: true,
    },
    id_user_category: {
      type: dataTypes.INTEGER(10),
      allowNull: false,
    },
  };
  let config = {
    tableName: "users",
    timestamps: false,
  };

  let User = sequelize.define(alias, cols, config);
  return User;
};
