import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calendar, Star, Film, BookOpen, HelpCircle } from 'lucide-react';
import './App.css';
import { ScrollToTopOnMount } from './components/ScrollToTop';
import HomePage from './components/HomePage';

if (import.meta.hot) {
  import.meta.hot.accept()
}

// 只对大型组件使用懒加载
const CharactersPage = lazy(() => import('./components/CharactersPage'));
const QAPage = lazy(() => import('./components/QAPage'));
const BoxOfficePage = lazy(() => import('./components/BoxOfficePage'));
const PostersPage = lazy(() => import('./components/PostersPage'));

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white">
          <div className="text-center">
            <h1 className="text-2xl mb-4">Something went wrong</h1>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTopOnMount />
      <ErrorBoundary>
        <div className="min-h-screen text-white bg-gradient-to-b from-blue-900 to-blue-950 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/box-office" element={<BoxOfficePage />} />
            <Route path="/posters" element={<PostersPage />} />
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
      </ErrorBoundary>
    </Router>
  );
};

export default App;