module.exports = (sequelize, Datatypes) => {
  const OrderList = sequelize.define('OrderList', {
    serviceId: {
      type: Datatypes.INTEGER,
      allowNull: false,
    },
    flightId: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    amount: {
      type: Datatypes.INTEGER,
      allowNull: false,
    }
  },
    {
      underscored: true
    }
  );

  OrderList.associate = models => {
    OrderList.belongsTo(models.Reservation, {
      foreignKey: {
        name: 'reservationId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    OrderList.belongsTo(models.Service, {
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return OrderList;
};


// user hasmany booking
// booking belongsTo user -userId

// flight hasmany booking
// booking belongsTo flight -flightId

// booking hasmany orderList
// orderListbelongsTo booking-bookingId

// service hasOne orderList
// orderList belongsTo service -- serviceId