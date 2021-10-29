const express = require('express');
const routerSudoku = express.Router();
const SudokuUser = require('../models/sudokuUser')

routerSudoku.post('/getuser', async (req,res)=>{
  const userId = req.body.id;
  const currentUser = await SudokuUser.find({
    _id: userId
  });
  res.json(currentUser);
});

routerSudoku.post('/upload', async (req,res)=>{
const { id, inactiveBoards, sudokuHardNumbers, sudokuUserNumbers } = req.body;
await SudokuUser.updateOne({
  _id: id
  },{
    $set: {
      inactiveBoards: inactiveBoards,
      sudokuHardNumbers: sudokuHardNumbers,
      sudokuUserNumbers: sudokuUserNumbers
    }
  });
  res.json({message: 'Zapisano'});
});

module.exports = routerSudoku;