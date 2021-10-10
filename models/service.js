module.exports = (sequelize, Datatypes) => {
  const Service = sequelize.define('Service', {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    description: {
      type: Datatypes.STRING,
      allowNull: false,
    },
    price: {
      type: Datatypes.INTEGER,
      allowNull: false,
    }
  },
    {
      underscored: true
    }
  );

  Service.associate = models => {
    Service.hasOne(models.OrderList, {
      foreignKey: {
        name: 'serviceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };


  return Service;
}