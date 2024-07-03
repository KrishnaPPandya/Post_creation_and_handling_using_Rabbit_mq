import { Post, IPost } from '../models/Post';
import { getChannel } from '../utils/rabbitmq';
import { clearCache } from '../utils/cache';

/**
 * Creates and saves a new post in the database.
 * 
 * @param postData - The data of the post to be created.
 * @returns The created post.
 */
export const createPost = async (postData: IPost): Promise<IPost> => {
  const post = new Post(postData);
  await post.save();
  return post;
};

/**
 * Asynchronously sends a post to the RabbitMQ queue.
 * 
 * @param postData - The data of the post to be queued.
 */
export const createPostAsync = async (postData: IPost): Promise<void> => {
  const channel = getChannel();
  channel.sendToQueue('posts', Buffer.from(JSON.stringify(postData)), { persistent: true });
};

/**
 * Counts the total number of posts in the database.
 * 
 * @returns The total number of posts.
 */
export const countPosts = async (): Promise<number> => {
  return await Post.countDocuments();
};

/**
 * Deletes all posts from the database.
 * 
 * @returns The result of the delete operation.
 */
export const deleteAllPosts = async (): Promise<{ deletedCount?: number }> => {
  const result = await Post.deleteMany({});

  
  clearCache(); 

  return result;

};
