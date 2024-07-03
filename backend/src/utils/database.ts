import mongoose, { ConnectOptions } from 'mongoose';

/**
 * Connects to the MongoDB database using the connection URI from environment variables.
 * 
 * This function attempts to connect to the MongoDB database using the connection URI
 * provided in the environment variable `MONGO_URI`. If the connection is successful,
 * it logs a success message. If an error occurs, it logs the error and exits the process
 * with a non-zero status code.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the database connection is established.
 * @throws {Error} If the connection to the database fails.
 */
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
