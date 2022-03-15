import express, {Request,Response,Application} from 'express';
import kafkaRouter from './routes/kafkaRouter.js';
import userRouter from './routes/userRouter.js';
import cors  from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
const { connect } = mongoose;

const port = 3333;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: express.Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/kafka', kafkaRouter);
app.use('/api/user', userRouter)

import * as dotenv from "dotenv";
dotenv.config();

// non-undefined assertion operator to account for undefined type
const db: string = process.env.MONGO_URI!;

connect(db)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err: Error) =>
      console.log(`Error found inside the mongoose connect method: ${err}`)
    );

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req: express.Request, res: express.Response):void => {
    res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))});

// add react router routes
app.get('/connectcluster', (req: express.Request, res: express.Response):void => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))});

app.get('/connectCluster', (req: express.Request, res: express.Response):void => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))});

app.get('/health', (req: express.Request, res: express.Response):void => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))});

app.get('/componentRelationships', (req: express.Request, res: express.Response):void => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))});
//type of error object
type errorType = {
    log: string;
    status: number;
    message: { err: string };
  };
  //404 error handler
  app.use('/*', (req, res) => {
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

app.listen(port, ():void => console.log(`Server running on port ${port}`)
);

export default app;
