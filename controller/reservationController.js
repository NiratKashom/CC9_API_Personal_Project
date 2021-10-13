const { Reservation, Passenger, Flight, OrderList, Service } = require('../models');

const { genReserveId } = require('../service/genIdService');


exports.getAllReservation = async (req, res, next) => {
  try {
    const allReservation = await Reservation.findAll(
      {
        include: [
          {
            model: Flight,
            attributes: [
              "departureDate",
              "arrivalDate",
              "returnDate",
              "departure",
              "destination",
            ],
            require: true
          }
          // {
          //   model: Passenger,
          //   attributes: [
          //     "email", "firstName", "lastName",
          //   ],
          //   require: true
          // }
        ]
      }
    );
    res.status(200).json({ allReservation });
  } catch (error) {
    res.json({ error });
  }
};

// get all resreve by userId
exports.getReserveByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const reserveByUser = await Reservation.findAll({
      where: {
        passengerId: userId
      },
      include: [
        {
          model: Flight,
          attributes: {
            exclude: [
              'id', 'createAt', 'updateAt'
            ]
          },
          require: true
        }
      ]
    });
    res.json({ reserveByUser });
  } catch (error) {
    res.json({ error });
  }
};

// get one resreve by Id by user
exports.getReserveById = async (req, res, next) => {
  try {
    const { reserveId } = req.params;
    const getReserveById = await Reservation.findOne({
      where: {
        id: reserveId
      },
      include: [
        {
          model: Flight,
          attributes: {
            exclude: [
              'createdAt', 'updatedAt', 'id'
            ]
          },
          require: true
        },
        {
          model: Passenger,
          attributes: [
            "email", "firstName", "lastName",
          ],
          require: true
        }
      ]
    });
    const orderList = await OrderList.findAll({
      attributes: ['amount', 'price'],
      where: {
        reservationId: reserveId
      },
      include: [
        {
          model: Service,
          attributes: [
            'name', 'serviceType'
          ],
          require: true
        },
      ]
    });
    reservationById = {
      id: getReserveById.id,
      passengerId: getReserveById.passengerId,
      flightId: getReserveById.flightId,
      status: getReserveById.status,
      payslipUrl: getReserveById.payslipUrl || null,
      flight: {
        ...getReserveById.Flight.dataValues
      },
      passenger: {
        ...getReserveById.Passenger.dataValues
      },
      orderList: [...orderList]
    };
    // console.log(orderByReserve);
    res.status(200).json({ reservationById });
  } catch (error) {
    res.json({ error });
  }
};

// create reservation
exports.createReservation = async (req, res, next) => {
  try {
    const { passengerId, flightId, orderList } = req.body;
    const reserveId = genReserveId(passengerId, flightId);

    const orderForCreate = orderList.map(item => ({
      reservationId: reserveId,
      serviceId: item.serviceId,
      flightId,
      amount: item.amount,
      price: item.price
    }));
    await Reservation.create({
      id: reserveId, passengerId, flightId
    });
    await OrderList.bulkCreate(orderForCreate);

    res.status(200).json({ message: 'create Reservation success' });
  } catch (error) {
    next(error);
  }
};

// exports.editFlight = async (req, res, next) => {
//   try {
//     const {
//       id,
//       destination,
//       returnDate,
//       arrivalDate,
//       departureDate } = req.body;

//     const rows = await Flight.update({
//       destination,
//       returnDate,
//       arrivalDate,
//       departureDate
//     }, {
//       where: {
//         id: id
//       }
//     });
//     if (!rows) return res.status(400).json({ message: 'fail to update list' });
//     res.status(200).json();
//   } catch (error) {
//     next(error);
//   }
// };

// exports.delFlight = async (req, res, next) => {
//   try {
//     const { flightId } = req.params;
//     const rows = await Flight.destroy({
//       where: {
//         id: flightId
//       }
//     });
//     if (!rows) return res.status(400).json({ message: 'fail to  delete' });
//     res.status(204).json({ message: 'delete success', rows });
//   } catch (error) {
//     next(error);
//   }
// };