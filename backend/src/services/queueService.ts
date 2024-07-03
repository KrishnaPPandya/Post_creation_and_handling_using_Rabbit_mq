import { createPost } from './postService';
import { getChannel } from '../utils/rabbitmq';
import { Server as WebSocketServer } from 'ws';

let queueSize = 0;

/**
 * Processes the RabbitMQ queue and updates the WebSocket clients with the queue size.
 * 
 * @param wss - The WebSocket server instance.
 */
export const processQueue = async (wss: WebSocketServer): Promise<void> => {
  const channel = getChannel();
  
  channel.consume('posts', async (msg) => {
    if (msg !== null) {
      const postData = JSON.parse(msg.content.toString());
      try {
        await createPost(postData);
        channel.ack(msg);
        console.log('Post created:', msg);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  });

  /**
   * Updates the queue size and notifies all connected WebSocket clients.
   */
  const updateQueueSize = async (): Promise<void> => {
    try {
      const q = await channel.checkQueue('posts');
      queueSize = q.messageCount;
      console.log('Queue Size:', queueSize);
      wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify({ type: 'QUEUE_SIZE', queueSize }));
        }
      });
    } catch (error) {
      console.error('Error checking queue size:', error);
    }
  };

  // Update queue size every second.
  setInterval(updateQueueSize, 1000);
};

/**
 * Gets the current size of the RabbitMQ queue.
 * 
 * @returns The current size of the queue.
 */
export const getQueueSize = (): number => queueSize;
