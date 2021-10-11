const { Service } = require('../models');

// find all Flight
exports.getAllService = async (req, res, next) => {
  try {
    const services = await Service.findAll();
    res.json({ services });
  } catch (error) {
    res.json({ error });
  }
};