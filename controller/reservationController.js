const { Reservation } = require('../models');
const { genReserveId } = require('../service/genIdService');

// find all Flight
// exports.getAllFlight = async (req, res, next) => {
//   try {
//     const flights = await Flight.findAll();
//     res.json({ flights });
//   } catch (error) {
//     res.json({ error });
//   }
// };

// find Flight by flightId
// exports.getFlightById = async (req, res, next) => {
//   try {
//     const { flightId } = req.params;
//     const flight = await Flight.findOne({
//       where: {
//         id: flightId
//       }
//     });
//     res.json({ message: 'got by flight id ', flight });
//   } catch (error) {
//     res.json({ error });
//   }
// };

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