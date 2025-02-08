import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calendar, Star, Film, BookOpen, HelpCircle } from 'lucide-react';
import './App.css';
import CharacterGuide from './components/CharacterGuide';
import { HomePage } from './components/HomePage'; // 我们将把 HomePage 移到单独的文件中
import QA from './components/QA'; // 导入 QA 组件

if (import.meta.hot) {
  import.meta.hot.accept()
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen text-white bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col">
        {/* Navigation Menu */}
        <nav className="bg-blue-900 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="text-xl font-bold">Nezha 2</Link>
              <div className="flex space-x-4">
                <Link to="/" className="hover:text-blue-300 transition">Home</Link>
                <Link to="/characters" className="hover:text-blue-300 transition">Characters</Link>
                <Link to="/qa" className="hover:text-blue-300 transition">Q&A</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharacterGuide />} />
          <Route path="/qa" element={<QA />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-blue-950 mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About */}
              <div className="col-span-2">
                <h4 className="text-xl font-bold mb-4">About Nezha: Mo Tong Nao Hai</h4>
                <p className="text-gray-300">
                  A modern reimagining of the beloved Chinese legend, bringing ancient mythology 
                  to life through spectacular animation and compelling storytelling.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a href="#trailer" className="hover:text-white transition">Watch Trailer</a>
                  </li>
                  <li>
                    <a href="#releases" className="hover:text-white transition">Release Dates</a>
                  </li>
                  <li>
                    <a href="#reviews" className="hover:text-white transition">Reviews</a>
                  </li>
                  <li>
                    <a href="#legend" className="hover:text-white transition">The Legend</a>
                  </li>
                </ul>
              </div>

              {/* Follow Us */}
              <div>
                <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" 
                     className="text-gray-300 hover:text-white transition">
                    Twitter
                  </a>
                  <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition">
                    Instagram
                  </a>
                  <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2024 Nezha: Mo Tong Nao Hai. All rights reserved.</p>
              <p className="mt-2 text-sm">
                Nezha character and story based on Chinese mythology and folklore. 
                Website designed with ❤️ for animation fans worldwide.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;