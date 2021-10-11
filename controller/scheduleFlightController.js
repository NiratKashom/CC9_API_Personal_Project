const { Flight } = require('../models');

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
    res.json({ flight });
  } catch (error) {
    res.json({ error });
  }
};

// exports.createList = async (req, res, next) => {
//   try {
//     const { title, status } = req.body;
//     const list = await List.create({
//       title, status, userId: req.user.id
//     });
//     res.status(201).json({ list });

//   } catch (error) {
//     next(error);
//   }
// };
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