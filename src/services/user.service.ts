import { DocumentDefinition } from 'mongoose';
import { User, userDocument } from '../models/user.model';

export const createUser = async (
	document: DocumentDefinition<Omit<userDocument, 'createdAt' | 'updatedAt'>>
) => {
	try {
		return await User.create(document);
	} catch (error: any) {
		const err = new Error(error.message);
		throw err;
	}
};
