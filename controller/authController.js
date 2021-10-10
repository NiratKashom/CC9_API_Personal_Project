// const { readFile, writeFile } = require('fs/promises');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { genUserId } = require('../service/genIdService');

// const pathUsers = './db/MOCK_USER.json';

exports.authenticate = async (req, res, next) => {

};

// login
exports.login = async (req, res, next) => {
  const { password, email } = req.body;
  // find email id DB
  const user = await User.findOne({
    where: {
      email: email
    }
  });
  //  is null user
  if (!user) return res.status(400).json({ message: 'invalid email or password' });
  // compare password and hasedpassword 
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(400).json({ message: `isPasswordCorrect: ${isPasswordCorrect}` });

  res.json({ user });
};


// register
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'password did not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({
      id: genUserId([firstName, lastName]),
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    res.status(200).json({ message: 'register success' });
  } catch (error) {
    res.json({ message: error.message });
  }
};


