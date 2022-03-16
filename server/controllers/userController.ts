import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import * as types from '../types';

const userController: Record<string, types.middlewareFunction> = {};

userController.createUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const newUser = {
			username,
			password,
		};
		const oldUser = await User.findOne({ username });
		// check if username is already in use
		if (oldUser) return res.status(409).send('This username is already in use');
		const userInfo = await User.create(newUser);
		res.locals.userInfo = userInfo;
		return next();
	} catch (err) {
    const defaultError = {
      log: 'Express error handler caught an error in userController.createUser middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named userController.createUser : ${req.body.username} + ${err}`
      },
    };
    return next(defaultError);
  };
};

userController.verifyUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const userInfo = await User.findOne({ username });
		// check if inputted password matches the hashed password
		let hashedPass: string;
		let matched: boolean = false;

		if (userInfo) {
			hashedPass = userInfo?.password;
			matched = bcrypt.compareSync(password, hashedPass);
		}
		if (!userInfo || !matched) {
      throw Error('Incorrect username or password');
    } else {
			console.log(userInfo)
      res.locals.username = userInfo.username;
			res.locals.userID = userInfo._id;
    }
    next();
	} catch (err) {
    const defaultError = {
      log: 'Express error handler caught an error in userController.verifyUser middleware',
      status: 401,
      message: {
        err: `An error occurred inside a middleware named userController.verifyUser middleware: ${req.body.username} + ${req.body.password} + ${err}`,
      },
    };
    return next(defaultError);
  }
}

userController.addUrlKafka = async (req, res, next) => {
	try {
		const { id, url_kafka } = req.body;
		const userInfo: any = await User.findOneAndUpdate({ id }, {
			$push: { kafkaClusters: url_kafka },
		}, { returnOriginal: false })
		res.locals.url_kafka = userInfo.kafkaClusters;
		return next();
	} catch (err) {
    const defaultError = {
      log: 'Express error handler caught an error in userController.addUrlKafka middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named userController.addUrlKafka : ${err}`
      },
    };
    return next(defaultError);
  }
}

userController.deleteURLKafka = async (req, res, next) => {
	try {
		const { id, url_kafka } = req.body;
		const userInfo: any = await User.findOneAndUpdate({ id }, {
			$pull: { kafkaClusters: url_kafka }
		}, { returnOriginal: false })
		console.log(userInfo)
		res.locals.url_kafka = userInfo.kafkaClusters;
		return next();
	} catch (err) {
		const defaultError = {
			log: 'Express error handler caught an error in userController.deleteURLKafka middleware',
			status: 500,
			message: {
				err: `An error occurred inside a middleware named userController.deleteURLKafka : ${err}`
			},
		};
		return next(defaultError);
	};
}

userController.addUrlPrometheus = async (req, res, next) => {
	try {
		const { id, url_prometheus } = req.body;
		const userInfo: any = await User.findOneAndUpdate({ id }, {
			$push: { prometheusClusters: url_prometheus },
		}, { returnOriginal: false })
		res.locals.url_prometheus = userInfo.prometheusClusters;
		return next();
	} catch (err) {
    const defaultError = {
      log: 'Express error handler caught an error in userController.addUrlPrometheus middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named userController.addUrlPrometheus : ${err}`
      },
    };
    return next(defaultError);
  }
}

userController.deleteUrlPrometheus = async (req, res, next) => {
	try {
		const { id, url_prometheus } = req.body;
		const userInfo: any = await User.findOneAndUpdate({ id }, {
			$pull: { prometheusClusters: url_prometheus }
		}, { returnOriginal: false })
		console.log(userInfo)
		res.locals.url_prometheus = userInfo.prometheusClusters;
		return next();
	} catch (err) {
		const defaultError = {
			log: 'Express error handler caught an error in userController.deleteUrlPrometheus middleware',
			status: 500,
			message: {
				err: `An error occurred inside a middleware named userController.deleteUrlPrometheus : ${err}`
			},
		};
		return next(defaultError);
	};
}
export default userController;
