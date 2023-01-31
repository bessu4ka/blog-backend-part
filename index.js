import mongoose from 'mongoose';
import multer from 'multer';

import express from 'express';
import { UserController, PostController } from './controllers/index.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';
import {
	registerValidation,
	loginValidation,
	postCreateValidation,
} from './validations.js';

mongoose
	.connect(
		'mongodb+srv://bessuka:wwwwww@cluster0.lhtavho.mongodb.net/blog?retryWrites=true&w=majority',
	)
	.then(() => console.log('DB ok'))
	.catch((error) => console.log('DB error', error));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post(
	'/auth/register',
	registerValidation,
	handleValidationErrors,
	UserController.register,
);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.post(
	'/posts',
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.create,
);
app.patch(
	'/posts/:id',
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.update,
);

app.listen(4444, (error) => {
	if (error) {
		return console.log(error);
	}
	console.log('Server OK');
});
