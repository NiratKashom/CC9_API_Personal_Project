const { Service } = require('../models');

// find all Flight
exports.getAllService = async (req, res, next) => {
  try {
    const Services = await Service.findAll();
    res.json({ Services });
  } catch (error) {
    res.json({ error });
  }
};