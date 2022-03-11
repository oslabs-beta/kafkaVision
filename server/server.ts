import express from 'express';
import userController from './controllers/userController';
import sessionController from './controllers/sessionController';
import cors from 'cors';
const path = require('path');

const port = 3000;

const app: express.Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: express.Request, res: express.Response) => {
   res.status(200).sendFile(path.join(__dirname, 'src/index.tsx'))});


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

module.exports = app;
