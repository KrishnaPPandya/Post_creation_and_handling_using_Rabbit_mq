import { Router } from 'express';
import { createPostController, searchPostsController, countPost, deleteAllPost } from '../controllers/postController';
import { authenticate } from '../services/authService';

const router = Router();

/**
 * Route for creating a post.
 * @route POST /api/posts
 * @access Public
 */
router.post('/posts', createPostController);

/**
 * Route for searching posts.
 * @route GET /api/search
 * @access Public
 */
router.get('/search', searchPostsController);

/**
 * Route for counting all posts.
 * @route GET /api/posts/count
 * @access Public
 */
router.get('/posts/count', countPost);

/**
 * Route for deleting all posts.
 * @route DELETE /api/posts
 * @access Public
 */
router.delete('/posts', deleteAllPost);

export default router;
