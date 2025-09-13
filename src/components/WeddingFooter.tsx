import React from 'react';

const WeddingFooter: React.FC = () => {
  return (
    <footer className="text-center py-6 text-gray-500 text-sm">
      <p>With love and gratitude</p>
      <p className="mt-1">&copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default WeddingFooter;