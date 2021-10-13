const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');
const { authenticate } = require('../controller/authController');


router.get('/', authenticate, reservationController.getAllReservation);
router.get('/:userId', authenticate, reservationController.getReserveByUserId);
router.get('/reservationInfo/:reserveId', authenticate, reservationController.getReserveById);
router.post('/', authenticate, reservationController.createReservation);
router.put('/reservationInfo/:reserveId', authenticate, reservationController.updateStatusReservation);

module.exports = router;