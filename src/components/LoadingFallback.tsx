import React from 'react';

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 flex items-center justify-center">
    <div className="text-white text-xl flex items-center space-x-2">
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
      <span className="ml-2">Loading...</span>
    </div>
  </div>
);

export default LoadingFallback; 