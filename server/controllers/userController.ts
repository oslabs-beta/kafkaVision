import User from '../models/userModel';
const bcrypt = require('bcryptjs');

const userController: any = {};

userController.createUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const newUser = {
			username,
			password,
		};
		const user = await User.findOne({ username });
		// check if username is already in use
		if (user) return res.status(409).send('This username is already in use');
		await User.create(newUser);
		res.locals.user = username;
		return next();
	} catch (err) {
    const defaultError = {
      log: 'Express error handler caught an error in userController.createUser middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named userController.createUser : ${err}`
      },
    };
    return next(defaultError);
  };
};

userController.verifyUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		// check if inputted password matches the hashed password
		let hashedPass: string, matched: string;
		if (user) {
			hashedPass = user?.password;
			matched = bcrypt.compareSync(password, hashedPass);
		}
		if (!user || !matched) {
      throw Error('Incorrect username or password');
    } else {
      res.locals.user = username;
    }
    next();
	} catch (err) {
    const defaultError = {
      log: 'Express error handler caught an error in userController.verifyUser middleware',
      status: 401,
      message: {
        err: `An error occurred inside a middleware named userController.verifyUser middleware: ${err}`,
      },
    };
    return next(defaultError);
  }

}

export default userController;
