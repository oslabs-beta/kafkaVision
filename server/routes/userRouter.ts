import * as express from 'express';
import userController from '../controllers/userController.js';
import sessionController from '../controllers/sessionController.js';
const router = express.Router();

router.post(
  '/signup',
  userController.createUser,
  (req: express.Request, res: express.Response) => {
    res.status(200).send(res.locals.user);
  }
);

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.user);
  }
);

export default router;