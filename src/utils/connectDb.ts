import mongoose from 'mongoose';
import config from 'config';
// import logger  from './logger';

const dbUri = config.get<string>('dbUri');

export const connectdb = async () => {
	mongoose.set("strictQuery", true)
	return mongoose
		.connect(dbUri, {})
		.then(() => {
			console.log('Connected to db');
		})
		.catch((err) => {
			console.log('Could not connect to database');
			process.exit(1);
		});
};
