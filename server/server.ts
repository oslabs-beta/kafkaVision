import express from 'express';
import userController from './controllers/userController';
import sessionController from './controllers/sessionController';
import cors from 'cors';
import { connect, ConnectOptions} from 'mongoose';
import path from 'path';
// import dirname from 'path'
// import { fileURLToPath } from 'url';

const port = 3000;

const app: express.Application = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = 'mongodb+srv://codesmith:admin@cluster0.jmtot.mongodb.net/kafkaVision?retryWrites=true&w=majority'

connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'kafkaVision',
  } as ConnectOptions)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err: Error) =>
      console.log(`Error found inside the mongoose connect method: ${err}`)
    );

app.get('/', (req: express.Request, res: express.Response) => {
   res.status(200).sendFile('/Users/Neel/Codesmith/projects/OSP/kafkavision/public/index.html')});

// Signup
app.post(
  '/signup',
  userController.createUser,
  (req: express.Request, res: express.Response) => {
    res.status(200).send(res.locals.user);
  }
);

// Login
app.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  (req: express.Request, res: express.Response) => {
    res.status(200).json(res.locals.user);
  }
);

//type of error object
type errorType = {
    log: string;
    status: number;
    message: { err: string };
  };
  //404 error handler
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
  //global error handler
app.use(
    (
      err: express.ErrorRequestHandler,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const defaultErr: errorType = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
      };
      const errorObj = { ...defaultErr, ...err };
      console.log(err);
      return res.status(errorObj.status).json(errorObj.message);
    }
  );

app.listen(port, () => console.log(`Server running on port ${port}`)
);

export default app;
