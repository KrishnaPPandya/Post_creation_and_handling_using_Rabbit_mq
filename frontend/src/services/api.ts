import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Creates a new post.
 * @param {any} postData - The data of the post to be created.
 * @returns {Promise<axios.AxiosResponse<any>>} The response from the API.
 */
export const createPost = async (postData: any) => {
  return api.post('/posts', postData);
};

/**
 * Searches for posts based on a query.
 * @param {string} query - The search query.
 * @returns {Promise<axios.AxiosResponse<any>>} The response from the API.
 */
export const searchPosts = async (query: string) => {
  return api.get(`/search?q=${query}`);
};
