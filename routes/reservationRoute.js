const express = require('express');
const router = express.Router();
const reservationController = require('../controller/reservationController');
const { authenticate } = require('../controller/authController');
const { upload } = require('../middleware/upload');


router.get('/', authenticate, reservationController.getAllReservation);
router.get('/:userId', authenticate, reservationController.getReserveByUserId);
router.get('/reservationInfo/:reserveId', authenticate, reservationController.getReserveById);
router.post('/', upload.single("payslip"), authenticate, reservationController.createReservation);
router.put('/reservationInfo/:reserveId', authenticate, reservationController.updateStatusReservation);

module.exports = router;