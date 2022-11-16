import express from 'express';
import SudokuUser from '../models/sudokuUser.js';
const routerRegister = express.Router();

routerRegister.post('/', async (req, res) => {
	const { login, password1, password2 } = req.query;

	if (password1 !== password2) {
		return res.json({ success: false, message: 'Hasła nie są jednakowe' });
	} else {
		const findUser = await SudokuUser.find({
			login: login,
		});

		if (findUser.length < 1) {
			const newUser = new SudokuUser({
				login: login,
				password: password1,
			});
			newUser.save();
			res.json({ success: true, message: 'ok' });
		} else {
			res.json({ success: false, message: 'Taki login już istnieje' });
		}
	}
});

export default routerRegister;
