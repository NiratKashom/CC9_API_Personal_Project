module.exports = (sequelize, Datatypes) => {
  // const Flight = 'asd';
  const Flight = sequelize.define('Flight', {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    departureDate: {
      type: Datatypes.DATE,
      allowNull: false,
    },
    arrivalDate: {
      type: Datatypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: Datatypes.DATE,
      allowNull: false,
    },
    departure: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    destination: {
      type: Datatypes.STRING,
      allowNull: false,
    }
  },
    {
      underscored: true
    }
  );

  Flight.associate = models => {
    Flight.hasMany(models.Reservation, {
      foreignKey: {
        name: 'flightId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return Flight;
};



