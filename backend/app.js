import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import resumeRoutes from './routes/resumeRoutes.js'; 

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

export default app;
