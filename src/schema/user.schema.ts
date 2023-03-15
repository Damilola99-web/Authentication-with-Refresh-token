import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
	body: object({
		name: string({
			required_error: 'Please provide a name',
			invalid_type_error: 'The value for name must be valid',
		}),
		email: string({
			required_error: 'Please provide a password',
		}).email('Email is not valid'),
		password: string({
			required_error: 'Please provide a password',
			invalid_type_error:
				'The value for name must be at least 6 characters',
		})
			.min(6)
			.max(20),
	}),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>>