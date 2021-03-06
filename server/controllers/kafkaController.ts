import kafka from 'kafkajs';
import * as types from '../types';

const kafkaController: Record<string, types.middlewareFunction> = {};

kafkaController.fetchTopics = (req, res, next) => {
  try {
    const { bootstrap } = req.body;
    const instance = new kafka.Kafka({
      clientId: 'kafkaVision',
      brokers: [`${bootstrap}`],
    });
    const admin = instance.admin();
    admin.connect();
    admin.listTopics().then((data: any) => {
      // Data format: [ 'topic-1', 'topic-2', 'topic-3', ... ]
      res.locals.data = data;
      return next();
    });
    admin.disconnect();
  } catch (err) {
    const defaultErr = {
      log: 'Express error handler caught an error in kafkaController.fetchTopics middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named kafkaController.fetchTopics : ${err}`,
      },
    };
    return next(defaultErr);
  }
};

kafkaController.fetchTopicMetadata = (req, res, next) => {
  try {
    const { bootstrap, topic } = req.body;
    const instance = new kafka.Kafka({
      clientId: 'kafkaVision',
      brokers: [`${bootstrap}`],
    });
    const admin = instance.admin();
    admin.connect();
    admin.fetchTopicMetadata({ topics: [`${topic}`] }).then((data: any) => {
      // Data format: { "topics" : [ "name", "partitions": [{}]]}
      res.locals.data = data;
      return next();
    });
    admin.disconnect();
  } catch (err) {
    const defaultErr = {
      log: 'Express error handler caught an error in kafkaController.fetchTopics middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named kafkaController.fetchTopics : ${err}`,
      },
    };
    return next(defaultErr);
  }
};

kafkaController.fetchTopicOffsets = (req, res, next) => {
  try {
    const { bootstrap, topic } = req.body;
    const instance = new kafka.Kafka({
      clientId: 'kafkaVision',
      brokers: [`${bootstrap}`],
    });
    const admin = instance.admin();
    admin.connect();
    admin.fetchTopicOffsets(`${topic}`).then((data: any) => {
      //  Data format:
      // [
      //   { partition: 0, offset: '31004', high: '31004', low: '421' },
      //   { partition: 1, offset: '54312', high: '54312', low: '3102' },
      //   { partition: 2, offset: '32103', high: '32103', low: '518' },
      //   { partition: 3, offset: '28', high: '28', low: '0' },
      // ]
      res.locals.data = data;
      return next();
    });
    admin.disconnect();
  } catch (err) {
    const defaultErr = {
      log: 'Express error handler caught an error in kafkaController.fetchTopics middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named kafkaController.fetchTopics : ${err}`,
      },
    };
    return next(defaultErr);
  }
};

kafkaController.describeCluster = (req, res, next) => {
  try {
    const { bootstrap } = req.body;
    const instance = new kafka.Kafka({
      clientId: 'kafkaVision',
      brokers: [`${bootstrap}`],
    });
    const admin = instance.admin();
    admin.connect();
    admin.describeCluster().then((data: any) => {
      // Data format: [ 'topic-1', 'topic-2', 'topic-3', ... ]
      res.locals.data = data;
      return next();
    });
    admin.disconnect();
  } catch (err) {
    const defaultErr = {
      log: 'Express error handler caught an error in kafkaController.fetchTopics middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named kafkaController.fetchTopics : ${err}`,
      },
    };
    return next(defaultErr);
  }
};

kafkaController.listGroups = (req, res, next) => {
  try {
    const { bootstrap } = req.body;
    const instance = new kafka.Kafka({
      clientId: 'kafkaVision',
      brokers: [`${bootstrap}`],
    });
    const admin = instance.admin();
    admin.connect();
    admin.listGroups().then((data: any) => {
      // Data format: [ 'topic-1', 'topic-2', 'topic-3', ... ]
      res.locals.data = data;
      return next();
    });
    admin.disconnect();
  } catch (err) {
    const defaultErr = {
      log: 'Express error handler caught an error in kafkaController.fetchTopics middleware',
      status: 500,
      message: {
        err: `An error occurred inside a middleware named kafkaController.fetchTopics : ${err}`,
      },
    };
    return next(defaultErr);
  }
};

export default kafkaController;
