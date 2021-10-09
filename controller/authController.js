// const { readFile, writeFile } = require('fs/promises');
const { User } = require('../models');
const { genUserId } = require('../service/genIdService');

const pathUsers = './db/MOCK_USER.json';

exports.authenticate = async (req, res, next) => {

};


exports.login = async (req, res, next) => {
  const { password, email } = req.body;
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'password did not match' });
    }
    await User.create({
      id: genUserId([firstName, lastName]),
      firstName,
      lastName,
      email,
      password
    });
    res.status(200).json({ message: 'register success' });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getUsers = async (req, res, next) => {
  try {

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


