import { body } from 'express-validator';

export const loginValidation = [
	body('email', 'Not valid email').isEmail(),
	body('password', 'The password must be less of 5 symbols').isLength({ min: 5 }),
];

export const registerValidation = [
	body('email', 'Not valid email').isEmail(),
	body('password', 'The password must be less of 5 symbols').isLength({ min: 5 }),
	body('fullName', 'Enter your name').isLength({ min: 3 }),
	body('avatarUrl', 'Invalid link').optional().isURL(),
];

export const postCreateValidation = [
	body('title', 'Enter the title').isLength({ min: 3, max: 50 }).isString(),
	body('text', 'Enter the text').isLength({ min: 10, max: 2000 }),
	body('tags', 'Not valid format (Enter array)').optional().isString(),
	body('imageUrl', 'Invalid link').optional().isString(),
];
