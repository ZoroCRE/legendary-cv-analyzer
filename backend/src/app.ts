import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import analysisRoutes from './routes/analysisRoutes';
import keywordsRoutes from './routes/keywordsRoutes';
import resultsRoutes from './routes/resultsRoutes';

// Initialize Express app
const app = express();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/app.log' }),
    new winston.transports.Console()
  ]
});

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rate limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per window
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req: Request, res: Response, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', analysisRoutes);
app.use('/api', keywordsRoutes);
app.use('/api', resultsRoutes);

// Error handling
app.use((err: Error, req: Request, res: Response, next: Function) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;