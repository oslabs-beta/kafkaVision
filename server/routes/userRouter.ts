import * as express from 'express';
import userController from '../controllers/userController.js';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

router.post(
  '/signup',
  userController.createUser,
  (req: express.Request, res: express.Response) => {
    res.status(200).send(res.locals);
  }
);

router.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals);
  }
);

router.post(
  '/logout',
  (req: express.Request, res: express.Response) => {
    res.locals.loggedin = false;
    res.status(200).json(res.locals.loggedin);
  }
);

router.post(
  '/saveprom',
  userController.addUrlPrometheus,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.url_prometheus);
  }
);

router.post(
  '/deleteprom',
  userController.deleteUrlPrometheus,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.url_prometheus);
  }
);

router.post(
  '/savekafka',
  userController.addUrlKafka,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.url_kafka);
  }
);

router.post(
  '/deletekafka',
  userController.deleteURLKafka,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.url_kafka);
  }
);

export default router;
