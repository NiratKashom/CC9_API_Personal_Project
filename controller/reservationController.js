const { Reservation, Passenger, Flight, OrderList, Service } = require('../models');

const { genReserveId } = require('../service/genIdService');
const fs = require('fs');
const util = require('util');
const cloundinary = require("cloudinary").v2;

const uploadPromise = util.promisify(cloundinary.uploader.upload);

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
    const getOrder = await OrderList.findAll(
      {
        raw: true,
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
      }
    );
    // console.log('below is order');
    // console.log(typeof getOrder);
    // const arr = [...getOrder].map(item => ({ amount, price, serviceName: item.Service.name, serviceType: item.Service.serviceType }));
    // console.log(arr);

    reservationById = {
      id: getReserveById.id,
      passengerId: getReserveById.passengerId,
      flightId: getReserveById.flightId,
      status: getReserveById.status,
      payslipUrl: getReserveById.payslipUrl,
      flight: {
        ...getReserveById.Flight.dataValues
      },
      passenger: {
        ...getReserveById.Passenger.dataValues
      },
      orderList: getOrder
    };
    // console.log(reservationById);
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

    const orderArr = JSON.parse(orderList).map((item) => ({
      reservationId: reserveId,
      serviceId: item.serviceId,
      amount: item.amount,
      price: item.price
    }));

    if (req.file) {
      result = await uploadPromise(req.file.path);
      console.log('below is result');
      console.log(result.secure_url);
      fs.unlinkSync(req.file.path);
    }
    await Reservation.create({
      id: reserveId, passengerId, flightId,
      payslipUrl: result.secure_url
    });
    await OrderList.bulkCreate(orderArr);

    res.status(200).json({ message: 'create Reservation success' });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.updateStatusReservation = async (req, res, next) => {
  try {
    const { status, reserveId } = req.body;

    const rows = await Reservation.update(
      {
        status
      }, {
      where: {
        id: reserveId
      }
    });
    if (!rows) return res.status(400).json({ message: 'fail to update' });
    res.status(200).json();
  } catch (error) {
    next(error);
  }
};

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