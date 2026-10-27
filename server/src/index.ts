import express from 'express';
import cors from 'cors';
import { config } from './config';
import plansRouter from './routes/plans';

const app = express();

// CORS: allow only the configured frontend origin
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

// Body parsing with payload limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/plans', plansRouter);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred.' });
});

const PORT = parseInt(config.PORT, 10);
app.listen(PORT, () => {
  console.log(`🚀 IdeaPilot server running on http://localhost:${PORT}`);
  console.log(`   Environment: ${config.NODE_ENV}`);
  console.log(`   CORS origin: ${config.CLIENT_URL}`);
});
