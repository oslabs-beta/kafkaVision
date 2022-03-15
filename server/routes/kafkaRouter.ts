import * as express from 'express';
import kafkaController from '../controllers/kafkaController.js';
const router = express.Router();


router.post('/topics', kafkaController.fetchTopics, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/topicmeta', kafkaController.fetchTopicMetadata, (req, res) => {
  res.status(200).json(res.locals.data);
});
router.post('/topicoffsets', kafkaController.fetchTopicOffsets, (req, res) => {
    res.status(200).json(res.locals.data);
});

router.post('/cluster', kafkaController.describeCluster, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/groups', kafkaController.listGroups, (req, res) => {
  res.status(200).json(res.locals.data);
});




export default router;