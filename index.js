import { fileURLToPath } from 'url';
import express from 'express';
import routerRegister from './routes/register.js';
import routerLogin from './routes/login.js';
import routerSudoku from './routes/sudoku.js';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.CONNECTION_URL);
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', (err) => console.log('Connected to database'));

const app = express();
app.use(express.json());
app.use(cors());
app.get('env');

app.use(
	'/register',
	routerRegister,
	express.static(path.join(__dirname, 'views'), {
		index: 'register.html',
	}),
);

app.use(
	'/',
	routerLogin,
	express.static(path.join(__dirname, 'views'), {
		index: 'login.html',
	}),
);

let idUser = null;
routerLogin.post('/:url', async (req, res) => {
	idUser = await req.params.url;
	app.use(
		`/${idUser}`,
		routerSudoku,
		express.static(path.join(__dirname, 'views'), {
			index: 'sudoku.html',
		}),
	);
	res.json({ message: 'ok' });
});

const server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function () {
	console.log('Listening on port %d', server_port);
});
