import Session from '../models/sessionModel.js';
import * as types from '../types';

const sessionController: Record<string, types.middlewareFunction> = {};

sessionController.startSession = async (req, res, next) => {
	try {
		const session = await Session.findOne({
			username: res.locals.username
		});
		if(!session) {
			const newSession = {
				username: res.locals.username
			};
			await Session.create(newSession);
		};
		next();
	} catch (err) {
		const defaultError = {
			log: 'Error handler caught an error at sessionController.startSession',
      status: 500,
      message: {
        err: `An error occurred at the sessionController.startSession middleware: ${err}`
			}
		};
		return next(defaultError)
	};
};

export default sessionController;
