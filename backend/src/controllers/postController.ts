import { Request, Response } from 'express';
import { createPostAsync, countPosts, deleteAllPosts } from '../services/postService';
import { Post } from '../models/Post';
import { getCache, setCache } from '../utils/cache';

/**
 * Controller to count the total number of posts in the database.
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const countPost = async (req: Request, res: Response) => {
  try {
    const count = await countPosts();
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error counting posts:', error);
    res.status(500).json({ error: 'Failed to count posts' });
  }
};

/**
 * Controller to delete all posts from the database.
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const deleteAllPost = async (req: Request, res: Response) => {
  try {
    await deleteAllPosts();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting posts:', error);
    res.status(500).json({ error: 'Failed to delete posts' });
  }
};

/**
 * Controller to create a new post and queue it for further processing.
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const createPostController = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    console.log(postData);
    await createPostAsync(postData);
    res.status(200).send('Post created and queued');
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};

/**
 * Controller to search posts by title.
 * Checks the cache first, and if not found, queries the database.
 * @param req - Express Request object
 * @param res - Express Response object
 */
export const searchPostsController = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const cachedResult = getCache(query);
  
  if (cachedResult) {
    return res.status(200).send(cachedResult);
  }

  try {
    const posts = await Post.find({ title: new RegExp(query, 'i') });
    setCache(query, posts);
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send('Internal server error');
  }
};
