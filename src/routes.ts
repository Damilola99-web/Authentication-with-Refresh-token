import { Express } from 'express';
import { createUserHandler } from './controllers/user.controller';
import { validateResource } from './middleware/validateResource';
import { createUserSchema } from './schema/user.schema';
function routes(app: Express) {
	app.get('/healthcheck', (req, res) => {
		res.status(200).json({ message: 'Api is up and Running' });
	});

	app.post(
		'/api/user/register',
		validateResource(createUserSchema),
		createUserHandler
	);
}

export default routes;
