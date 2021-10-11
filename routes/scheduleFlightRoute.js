const express = require('express');
const router = express.Router();
const { authenticate } = require('../controller/authController');
const scheduleFlightController = require('../controller/scheduleFlightController');


router.get('/', scheduleFlightController.getAllFlight);
router.get('/:flightId', scheduleFlightController.getFlightById);


module.exports = router;