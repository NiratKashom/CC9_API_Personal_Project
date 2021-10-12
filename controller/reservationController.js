const { Reservation, Passenger, Flight } = require('../models');

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

// find Flight by flightId
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
          attributes: [
            "departureDate",
            "arrivalDate",
            "returnDate",
            "departure",
            "destination",
          ],
          require: true
        }
      ]
    });
    res.json({ reserveByUser });
  } catch (error) {
    res.json({ error });
  }
};

exports.createReservation = async (req, res, next) => {
  try {
    const { passengerId, flightId, orderList } = req.body;
    const reserveId = genReserveId(passengerId, flightId);
    const newReservation = await Reservation.create({
      id: reserveId, passengerId, flightId
    });

    res.status(200).json({ message: 'create Reservation success', newReservation });
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