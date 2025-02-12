import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calendar, Star, Film, BookOpen, HelpCircle } from 'lucide-react';
import './App.css';
import { ScrollToTopOnMount } from './components/ScrollToTop';
import Loading from './components/Loading';

if (import.meta.hot) {
  import.meta.hot.accept()
}

// 简化懒加载的写法
const HomePage = lazy(() => import('./components/HomePage'));
const CharactersPage = lazy(() => import('./components/CharactersPage'));
const QAPage = lazy(() => import('./components/QAPage'));
const BoxOfficePage = lazy(() => import('./components/BoxOfficePage'));
const PostersPage = lazy(() => import('./components/PostersPage'));

const App: React.FC = () => {
  useEffect(() => {
    // 预加载其他页面资源
    const prefetchOtherPages = () => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = '/characters';
      document.head.appendChild(link);
    };
    
    // 当首页加载完成后执行
    window.requestIdleCallback?.(prefetchOtherPages);
  }, []);

  return (
    <Router>
      <ScrollToTopOnMount />
      <div className="min-h-screen text-white bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/box-office" element={<BoxOfficePage />} />
            <Route path="/posters" element={<PostersPage />} />
          </Routes>
        </Suspense>

        {/* Footer */}
        <footer className="bg-blue-950 mt-auto">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About */}
              <div className="col-span-2">
                <h4 className="text-xl font-bold mb-4">About Nezha: Mo Tong Nao Hai</h4>
                <p className="text-gray-300">
                  A modern reimagining of the beloved Chinese legend, bringing ancient mythology 
                  to life through spectacular animation and compelling storytelling. The film has 
                  become China's highest-grossing film of all time and the first Chinese film to 
                  surpass $1 billion at the global box office.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <Link to="/" className="hover:text-white transition">Home</Link>
                  </li>
                  <li>
                    <Link to="/box-office" className="hover:text-white transition">Box Office</Link>
                  </li>
                  <li>
                    <Link to="/characters" className="hover:text-white transition">Characters</Link>
                  </li>
                  <li>
                    <Link to="/posters" className="hover:text-white transition">Posters</Link>
                  </li>
                  <li>
                    <Link to="/qa" className="hover:text-white transition">Q&A</Link>
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
              <p>© 2025 Nezha: Mo Tong Nao Hai. All rights reserved.</p>
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