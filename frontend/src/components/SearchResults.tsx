import React from 'react';

interface SearchResult {
  id: string; 
  title: string;
  message: string;
  
}

interface SearchResultsProps {
  results: SearchResult[];
}

/**
 * SearchResults component to display the search results.
 * @param {SearchResultsProps} props - The props for the SearchResults component.
 * @param {SearchResult[]} props.results - The array of search results.
 * @returns {JSX.Element} The rendered SearchResults component.
 */
const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <h3>{result.title}</h3>
              <p>{result.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
