import React, { useState } from 'react';
import { createPost } from '../services/api';

interface PostFormProps {
  incrementTotalPosts: () => void;
  incrementSuccessfulPosts: () => void;
  incrementFailedPosts: () => void;
}

/**
 * PostForm component for creating a new post.
 * @param {PostFormProps} props - The props for the PostForm component.
 * @param {() => void} props.incrementTotalPosts - Function to increment the total posts count.
 * @param {() => void} props.incrementSuccessfulPosts - Function to increment the successful posts count.
 * @param {() => void} props.incrementFailedPosts - Function to increment the failed posts count.
 * @returns {JSX.Element} The rendered PostForm component.
 */
const PostForm: React.FC<PostFormProps> = ({ incrementTotalPosts, incrementSuccessfulPosts, incrementFailedPosts }) => {
  const [postData, setPostData] = useState({ title: '', message: '', location: '', context: '' });

  /**
   * Handles the change event for the input fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  /**
   * Handles the form submission.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    incrementTotalPosts();
    try {
      const postDataWithDefaults = {
        ...postData,
        location: postData.location || 'Default Location',
        context: postData.context || 'Default Context',
      };

      await createPost(postDataWithDefaults);
      incrementSuccessfulPosts();

      // Optionally reset form data
      // setPostData({ title: '', message: '', location: '', context: '' });
    } catch (error) {
      incrementFailedPosts();
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={postData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="message" value={postData.message} onChange={handleChange} placeholder="Message" required />
      <input type="text" name="location" value={postData.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="context" value={postData.context} onChange={handleChange} placeholder="Context" />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;
