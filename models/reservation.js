module.exports = (sequelize, Datatypes) => {
  const Reservation = sequelize.define('Reservation', {
    id: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    passengerId: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    flightId: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    status: {
      type: Datatypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    payslipUrl: {
      type: Datatypes.STRING,
      defaultValue: ''
    }
  },
    {
      underscored: true
    }
  );

  Reservation.associate = models => {

    Reservation.hasMany(models.OrderList, {
      foreignKey: {
        name: 'reservationId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Reservation.belongsTo(models.Passenger, {
      foreignKey: {
        name: 'passengerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });

    Reservation.belongsTo(models.Flight, {
      foreignKey: {
        name: 'flightId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });


  };
  return Reservation;
};

