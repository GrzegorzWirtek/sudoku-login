const express = require('express');
const routerRegister = express.Router();
const SudokuUser = require('../models/sudokuUser')

routerRegister.post('/', async (req,res)=>{
  const { login, password1, password2 } = req.query;

  if (password1 !== password2){
    return res.json({success: false, message: 'Hasła nie są jednakowe'})
  }else{
    const findUser = await SudokuUser.find({
      login: login
     }
    );

    if(findUser.length < 1){ 
      const newUser = new SudokuUser({
        login: login,
        password: password1
      });
      newUser.save();
      res.json({success: true, message: 'ok'});
    }else{
      res.json({success: false, message: 'Taki login już istnieje'})
    }
  };
});

module.exports = routerRegister;