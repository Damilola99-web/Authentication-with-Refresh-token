import { NextFunction, Request, Response } from 'express';
import { RequestError } from '../interfaces';
import { User } from '../models/user.model';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../services/user.service';

export const createUserHandler = async (
	req: Request<{},{}, CreateUserInput>,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await createUser(req.body);
	} catch (error) {
		console.log(error);
		const err: RequestError = new Error(
			'Could not complete registration, please try again'
		);
		err.statusCode = 409;
		next(err);
	}
};
