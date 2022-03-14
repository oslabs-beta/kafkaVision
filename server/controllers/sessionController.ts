import Session from '../models/sessionModel';

const sessionController: any = {};

sessionController.startSession = async (req, res, next) => {
	try {
		// check if session exists. If not, create one
		const session = await Session.findOne({
			username: res.locals.user
		});
		if(!session) {
			const newSession = {
				username: res.locals.user
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
