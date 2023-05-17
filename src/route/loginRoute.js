const express = require('express');
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const routerLogin = express.Router();

routerLogin.post('/',
validateEmail,
validatePassword,
async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].includes(undefined)) {
    return res.status(401).json({ message: 'Campos ausentes!' });
  }

  const token = generateToken();

  return res.status(200).json({ token });
});

module.exports = routerLogin;