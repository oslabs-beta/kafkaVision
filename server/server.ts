import express, {Request,Response,Application} from 'express';
//import express = require('express');
import * as userController from './controllers/userController';
import * as sessionController from './controllers/sessionController';
import cors  from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const port = 3333;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app: express.Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', (req: express.Request, res: express.Response):void => {
   res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))});

app.get('/test', (req: express.Request, res: express.Response) => {
  res.status(200).json('backend working')});
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

app.listen(port, ():void => console.log(`Server running on port ${port}`)
);

export default app;
