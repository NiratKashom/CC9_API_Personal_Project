const { Flight } = require('../models');
const { genFlightId } = require('../service/genIdService');

// find all Flight
exports.getAllFlight = async (req, res, next) => {
  try {
    const flights = await Flight.findAll();
    res.json({ flights });
  } catch (error) {
    res.json({ error });
  }
};

// find Flight by flightId
exports.getFlightById = async (req, res, next) => {
  try {
    const { flightId } = req.params;
    const flight = await Flight.findOne({
      where: {
        id: flightId
      }
    });
    res.json({ message: 'got by flight id ', flight });
  } catch (error) {
    res.json({ error });
  }
};

exports.createFlight = async (req, res, next) => {
  try {
    const body = req.body;
    // console.log(newFlight);
    const newFlight = await Flight.create({
      ...body,
      id: genFlightId(body.destination)
    });
    res.status(200).json({ message: 'create fligth success', newFlight });

  } catch (error) {
    next(error);
  }
};

// exports.editList = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, status } = req.body;
//     const [rows] = await List.update({
//       title, status
//     }, {
//       where: {
//         id, userId: req.user.id
//       }
//     });
//     if (rows) return res.status(400).json({ message: 'fail to update list' });
//     res.status(200).json({
//       message: 'success update list'
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.delList = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const rows = await List.destroy({
//       where: {
//         id,
//         userId: req.user.id
//       }
//     });

//     if (rows) return res.status(400).json({ message: 'fail to  delete list' });
//     res.status(204).json();
//   } catch (error) {
//     next(error);
//   }
// };