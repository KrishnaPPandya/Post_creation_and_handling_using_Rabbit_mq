import React from 'react';

interface CounterProps {
  total: number;
  successful: number;
  failed: number;
}

/**
 * Counter component to display the total, successful, and failed posts.
 * @param {CounterProps} props - The props for the Counter component.
 * @param {number} props.total - The total number of posts.
 * @param {number} props.successful - The number of successful posts.
 * @param {number} props.failed - The number of failed posts.
 * @returns {JSX.Element} The rendered Counter component.
 */
const Counter: React.FC<CounterProps> = ({ total, successful, failed }) => {
  return (
    <div>
      <p>Total Posts: {total}</p>
      <p>Successful Posts: {successful}</p>
      <p>Failed Posts: {failed}</p>
    </div>
  );
};

export default Counter;
