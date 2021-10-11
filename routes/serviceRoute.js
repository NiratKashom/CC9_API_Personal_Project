const express = require('express');
const router = express.Router();
const { authenticate } = require('../controller/authController');
const serviceController = require('../controller/serviceController');


router.get('/', serviceController.getAllService);



module.exports = router;