const express = require('express');
const router = express.Router();
const { authenticate } = require('../controller/authController');
const scheduleFlightController = require('../controller/scheduleFlightController');


router.get('/', scheduleFlightController.getAllFlight);
router.get('/:flightId', authenticate, scheduleFlightController.getFlightById);
router.post('/', authenticate, scheduleFlightController.createFlight);
router.put('/:flightId', authenticate, scheduleFlightController.editFlight);
router.delete('/:flightId', authenticate, scheduleFlightController.delFlight);


module.exports = router;