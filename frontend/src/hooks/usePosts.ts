import { useState } from 'react';
import { createPost, searchPosts } from '../services/api';

interface PostData {
  title: string;
  message: string;
  context: string;
  tags: string[];
  location: string;
  images: string[];
  externalLinks: string[];
  numLikes: number;
  numBookmarks: number;
  numViews: number;
}

/**
 * Custom hook to manage posts, including adding new posts and searching for posts.
 * @returns {Object} An object containing posts, addPost, search, loading, and error.
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Adds a new post.
   * @param {PostData} postData - The data of the post to be added.
   */
  const addPost = async (postData: PostData) => {
    setLoading(true);
    try {
      await createPost(postData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Searches for posts based on a query.
   * @param {string} query - The search query.
   */
  const search = async (query: string) => {
    setLoading(true);
    try {
      const response = await searchPosts(query);
      setPosts(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { posts, addPost, search, loading, error };
};
