import express from 'express';
import { fetchIndustryNews } from '../controllers/newsController.js'

const router = express.Router();

router.post('/industry-fetch', fetchIndustryNews);

export default router;
