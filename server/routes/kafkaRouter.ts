import * as express from 'express';
import kafkaController from '../controllers/kafkaController.js';

const router = express.Router();

router.post(
  '/topics',
  kafkaController.fetchTopics,
  (req: express.Request, res: express.Response) => {
  res.status(200).json(res.locals.data);
});

router.post(
  '/topicmeta',
  kafkaController.fetchTopicMetadata,
  (req: express.Request, res: express.Response) => {
  res.status(200).json(res.locals.data);
});

router.post(
  '/topicoffsets',
  kafkaController.fetchTopicOffsets,
  (req: express.Request, res: express.Response) => {
  res.status(200).json(res.locals.data);
});

router.post(
  '/cluster',
  kafkaController.describeCluster,
  (req: express.Request, res: express.Response) => {
  res.status(200).json(res.locals.data);
});

router.post(
  '/groups',
  kafkaController.listGroups,
  (req: express.Request, res: express.Response) => {
  res.status(200).json(res.locals.data);
});

export default router;
