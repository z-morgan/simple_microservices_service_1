import { Router } from 'express';

const route = Router();

route.get('', (req, res, next) => {
	res.send('Hello from service_1');
});

export default route;