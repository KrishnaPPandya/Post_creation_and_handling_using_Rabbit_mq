import React from 'react';

interface QueueInfoProps {
  queueSize: number;
}

/**
 * QueueInfo component to display the current size of the queue.
 * @param {QueueInfoProps} props - The props for the QueueInfo component.
 * @param {number} props.queueSize - The current size of the queue.
 * @returns {JSX.Element} The rendered QueueInfo component.
 */
const QueueInfo: React.FC<QueueInfoProps> = ({ queueSize }) => {
  return <div>Current Queue Size: {queueSize}</div>;
};

export default QueueInfo;
