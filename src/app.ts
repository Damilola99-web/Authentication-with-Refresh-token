import express, { NextFunction, Request, Response } from 'express';
import config from 'config';
import { connectdb } from './utils/connectDb';
// import logger from './utils/logger';
import routes from './routes';
import { RequestError } from './interfaces';

const app = express();

const port = config.get<number>('port');

routes(app);

app.use((req, res) => {
	return res
		.status(404)
		.json({ message: "Resource requested for wasn't found" });
});

app.use((err: RequestError, req: Request, res: Response, next: NextFunction) => {
	return res.status(err.statusCode || 500).json({
		message:
			err.message || 'AN error occurred on the server, please try again.',
	});
});

app.listen(port, async () => {
	console.log('Server running on port ' + port);
	await connectdb();
	routes(app);
});
