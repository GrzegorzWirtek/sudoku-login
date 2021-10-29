const express = require('express');
const routerLogin = express.Router();
const SudokuUser = require('../models/sudokuUser');
const cors = require('cors');

routerLogin.post('/', cors(), async (req,res)=>{
  const { login, password } = req.query;
  const findUser = await SudokuUser.find({
      login: login,
      password: password
    }
  );
  res.json(findUser);
});

module.exports = routerLogin;