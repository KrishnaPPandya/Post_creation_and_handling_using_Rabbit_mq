import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/database';
import { connectQueue } from './utils/rabbitmq';
import postRoutes from './routes/postRoutes';
import { processQueue } from './services/queueService';
import cors from 'cors';
import { Server as WebSocketServer } from 'ws';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use('/api', postRoutes);

connectDB();

const wss = new WebSocketServer({ port: 8080 });

/**
 * Handles WebSocket connections.
 * @param {WebSocket} ws - The WebSocket connection object.
 */
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({ type: 'QUEUE_SIZE', queueSize: 0 }));

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

/**
 * Connects to the message queue and starts processing the queue.
 * @param {WebSocketServer} wss - The WebSocket server instance.
 * @returns {Promise<void>}
 */
connectQueue().then(() => processQueue(wss));

/**
 * Starts the Express server.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
