import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Not valid email').isEmail(),
	body('password', 'The password must be less of 5 symbols').isLength({ min: 5 }),
	body('fullName', 'Enter your name').isLength({ min: 3 }),
	body('avatarUrl', 'Invalid link').optional().isURL(),
];
