import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import SearchResults from './SearchResults'; // Import the SearchResults component

/**
 * SearchBar component for searching posts.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar: React.FC = () => {
  const { search, posts, loading, error } = usePosts(); // Destructure posts, loading, and error from usePosts hook
  const [query, setQuery] = useState('');

  /**
   * Handles the search form submission.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await search(query);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts"
          required
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {posts.length > 0 && <SearchResults results={posts} />} {/* Render SearchResults if posts array is not empty */}
    </div>
  );
};

export default SearchBar;
