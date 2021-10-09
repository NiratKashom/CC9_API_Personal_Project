module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define('User', {
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
    }
  },
    {
      underscored: true
    }
  );

  return User;
}