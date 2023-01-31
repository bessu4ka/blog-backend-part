import mongoose from 'mongoose';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import express from 'express';
import checkAuth from './utils/checkAuth.js';
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

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (error) => {
	if (error) {
		return console.log(error);
	}
	console.log('Server OK');
});
