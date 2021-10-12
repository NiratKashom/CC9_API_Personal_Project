const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');


router.get('/', reservationController.getAllReservation);
router.get('/:userId', reservationController.getReserveByUserId);
router.post('/', reservationController.createReservation);
// router.put('/:flightId', reservationController.editFlight);
// router.delete('/:flightId', reservationController.delFlight);


module.exports = router;