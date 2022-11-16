import express from 'express';
import SudokuUser from '../models/sudokuUser.js';
import cors from 'cors';
const routerLogin = express.Router();

routerLogin.post('/', cors(), async (req, res) => {
	const { login, password } = req.query;
	const findUser = await SudokuUser.find({
		login: login,
		password: password,
	});
	res.json(findUser);
});

export default routerLogin;
