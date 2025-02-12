import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`navigation-container ${!isHomePage ? 'with-background' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center h-16">
          <div className="flex space-x-6">
            <Link to="/" className="text-white hover:text-blue-300 transition">Home</Link>
            <Link to="/box-office" className="text-white hover:text-blue-300 transition">Box Office</Link>
            <Link to="/characters" className="text-white hover:text-blue-300 transition">Characters</Link>
            <Link to="/posters" className="text-white hover:text-blue-300 transition">Posters</Link>
            <Link to="/qa" className="text-white hover:text-blue-300 transition">Q&A</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation; 