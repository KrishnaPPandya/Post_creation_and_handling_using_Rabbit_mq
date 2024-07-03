import React, { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import SearchBar from './components/SearchBar';
import Counter from './components/Counter';
import QueueInfo from './components/QueueInfo';
import axios from 'axios';

/**
 * Main App component.
 * @returns {JSX.Element} The rendered App component.
 */
const App: React.FC = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [successfulPosts, setSuccessfulPosts] = useState(0);
  const [failedPosts, setFailedPosts] = useState(0);
  const [queueSize, setQueueSize] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === 'QUEUE_SIZE') {
        console.log("try");
        setQueueSize(data.queueSize);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/count');
        setTotalPosts(response.data.count);
      } catch (error) {
        console.error('Error fetching total posts:', error);
      }
    };

    fetchTotalPosts();
  }, []);

  /**
   * Increments the total posts count by 1.
   */
  const incrementTotalPosts = () => setTotalPosts(totalPosts + 1);

  /**
   * Increments the successful posts count by 1.
   */
  const incrementSuccessfulPosts = () => setSuccessfulPosts(successfulPosts + 1);

  /**
   * Increments the failed posts count by 1.
   */
  const incrementFailedPosts = () => setFailedPosts(failedPosts + 1);

  /**
   * Resets the state by deleting all posts and resetting counters.
   */
  const resetState = async () => {
    try {
      await axios.delete('http://localhost:5000/api/posts');
      setTotalPosts(0);
      setSuccessfulPosts(0);
      setFailedPosts(0);
      setQueueSize(0);
    } catch (error) {
      console.error('Error deleting all posts:', error);
    }
  };

  return (
    <div>
      <button onClick={resetState}>Reset State</button>
      <PostForm 
        incrementTotalPosts={incrementTotalPosts} 
        incrementSuccessfulPosts={incrementSuccessfulPosts} 
        incrementFailedPosts={incrementFailedPosts} 
      />
      <SearchBar />
      <Counter total={totalPosts} successful={successfulPosts} failed={failedPosts} />
      <QueueInfo queueSize={queueSize} />
    </div>
  );
};

export default App;
