import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import resumeRoutes from './routes/resumeRoutes.js';
import newsRoutes from './routes/newsRoutes.js';  

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    const now = new Date().toLocaleString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api/resume', resumeRoutes);
app.use('/api/news', newsRoutes);

export default app;
