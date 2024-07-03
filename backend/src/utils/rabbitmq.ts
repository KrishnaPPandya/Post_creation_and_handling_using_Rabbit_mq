import amqp from 'amqplib';

let channel: amqp.Channel;

/**
 * Connects to the RabbitMQ server using the connection URI from environment variables.
 * 
 * This function attempts to connect to the RabbitMQ server using the connection URI
 * provided in the environment variable `RABBITMQ_URI`. If the connection is successful,
 * it creates a channel and asserts a queue named 'posts'. If an error occurs, it logs the error.
 * 
 * @async
 * @function connectQueue
 * @returns {Promise<void>} A promise that resolves when the connection and queue setup are complete.
 * @throws {Error} If the connection to RabbitMQ or the queue setup fails.
 */
export const connectQueue = async (): Promise<void> => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI!);
    channel = await connection.createChannel();
    await channel.assertQueue('posts', { durable: true });
    console.log('RabbitMQ connected');
  } catch (err) {
    console.error(err);
  }
};

/**
 * Retrieves the current AMQP channel.
 * 
 * This function returns the current AMQP channel that was established
 * during the connection to RabbitMQ.
 * 
 * @function getChannel
 * @returns {amqp.Channel} The current AMQP channel.
 */
export const getChannel = (): amqp.Channel => channel;
