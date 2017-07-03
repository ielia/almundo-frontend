import { version } from '../../package.json';
import { Router } from 'express';
import availability from './availability';
import hotels from './hotels';

export default ({ config, db }) => {
	let api = Router();

	api.use('/availability', availability({ config, db }));
	api.use('/hotels', hotels({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
