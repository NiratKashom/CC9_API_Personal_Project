// const { readFile, writeFile } = require('fs/promises');

const bcrypt = require('bcryptjs');
const { genUserId } = require('../service/genIdService');
const { Passenger } = require('../models');
const jwt = require('jsonwebtoken');

// const pathUsers = './db/MOCK_USER.json';

exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({
        message: 'you are unauthorlized'
      });
    }
    console.log(authorization);

    const token = authorization.split(' ')[1];
    // console.log(token);
    if (!token) {
      return res.status(401).json({
        message: 'you are unauthorlized'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      where: {
        id: decoded.id
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'you are unauthorlized'
      });
    }

    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    // find email id DB
    const user = await Passenger.findOne({
      where: {
        email: email
      }
    });
    //  is null user
    if (!user) return res.status(400).json({ message: 'invalid email or password' });
    // compare password and hasedpassword 
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: `isPasswordCorrect: ${isPasswordCorrect}` });

    // JWT
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '30d'
    });
    console.log('login success');
    res.json({ token });
  } catch (error) {
    next(error);
  }

};


// register
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'password did not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await Passenger.create({
      id: genUserId([firstName, lastName]),
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    res.status(200).json({ message: 'register success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};


