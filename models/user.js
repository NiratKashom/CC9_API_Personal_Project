module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: Datatypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
    {
      underscored: true
    }
  );

  return User;
}