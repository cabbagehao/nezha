import React, { lazy, Suspense } from 'react';
import { Calendar, Star, Film, BookOpen, ArrowRight, TrendingUp } from 'lucide-react';
import { Ratings } from '../services/ratings';
import ScrollToTop from './ScrollToTop';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Home.css';

const TrailerSection = lazy(() => import('./TrailerSection'));

const HomePage: React.FC = () => {
  const ratings: Ratings = {
    imdb: {
      score: '8.3',
      votes: '2k'
    },
    douban: {
      score: '8.5',
      votes: '1M'
    }
  };

  const globalReleases = [
    { date: '2025-01-29', countries: ['Mainland China'] },
    { date: '2024-02-13', countries: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'] },
    { date: '2024-02-14', countries: ['United States', 'Canada'] },
    { date: 'Coming Soon', countries: ['Singapore', 'Malaysia', 'Egypt', 'South Africa', 'Pakistan', 'Japan', 'Korea'] }
  ];

  const RatingCard = ({ site, logo, score, votes, url, starColor }: { 
    site: string;
    logo: string;
    score: string;
    votes: string;
    url: string;
    starColor: string;
  }) => (
    <a href={url}
       target="_blank" 
       rel="noopener noreferrer"
       className="bg-blue-800 bg-opacity-30 p-6 rounded-lg hover:bg-opacity-40 transition">
      <div className="flex items-center mb-4">
        <img 
          src={logo} 
          alt={site} 
          width={site === 'IMDb' ? 70 : 90}
          height={site === 'IMDb' ? 32 : 28}
          loading="eager"
          className="h-8 mr-3 object-contain"
          style={{
            filter: site === 'IMDb' ? 'brightness(1.2) contrast(1.1)' : 'none',
          }}
        />
        <div>
          <div className="flex items-center">
            <Star className={`w-5 h-5 ${starColor} mr-1`} fill="currentColor" />
            <span className="text-2xl font-bold">{score}</span>
            <span className="text-sm ml-2 text-gray-300">/ 10</span>
          </div>
          <div className="text-sm text-gray-300">
            {`${votes} votes`}
          </div>
        </div>
      </div>
      <p className="text-gray-300">
        {site === 'IMDb' ? 'Check out reviews and ratings on IMDb →' : 'Read reviews and ratings on Douban →'}
      </p>
    </a>
  );

  return (
    <>
      {/* Hero Section */}
      <div 
        className="relative h-[30vh] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(/images/nezha-homepage.jpg)`,
          backgroundPosition: 'center 20%'
        }}
      >
        <Navigation />
        
        <div className="absolute inset-0 bg-black bg-opacity-70">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl mt-8 md:mt-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Nezha: Mo Tong Nao Hai</h1>
              <p className="text-base md:text-lg mb-4">Experience the legendary tale of Ne Zha in this spectacular animated feature</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Global Release Dates */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2" /> Global Release Dates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {globalReleases.map((release, index) => (
              <div key={index} className="bg-blue-800 bg-opacity-30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{release.date}</h3>
                <ul className="list-disc list-inside">
                  {release.countries.map((country, idx) => (
                    <li key={idx}>{country}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Trailer Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Film className="mr-2" /> Official Trailer
          </h2>
          <Suspense fallback={
            <div className="h-[500px] bg-blue-800 bg-opacity-30 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-white">Loading trailer...</div>
            </div>
          }>
            <TrailerSection />
          </Suspense>
        </section>

        {/* Reviews and Box Office Section */}
        <section className="py-16 bg-gradient-to-b from-blue-900/50 to-blue-950/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Box Office Achievement */}
              <div className="md:col-span-1">
                <h2 className="text-4xl font-bold mb-4 flex items-center">
                  <TrendingUp className="mr-2" /> Box Office Achievement
                </h2>
                <div className="max-w-xl bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-lg p-8 border border-orange-500/30">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-5 text-orange-400">Global Box Office Milestone</h3>
                      <div className="space-y-4">
                        <p className="text-lg">
                          <span className="text-3xl font-bold text-orange-400">$1.30B</span>
                          <span className="text-gray-300 ml-2">Worldwide</span>
                        </p>
                        <p className="text-lg">
                          <span className="text-2xl font-bold text-orange-400">#23</span>
                          <span className="text-gray-300 ml-2">All-time Global Ranking</span>
                        </p>
                        <p className="text-gray-300">
                          First Chinese film to surpass $1 billion at the global box office
                        </p>
                      </div>
                      <Link 
                        to="/box-office" 
                        className="inline-flex items-center mt-6 text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        View Full Rankings
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="relative w-36 h-36 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full animate-pulse"></div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-orange-400">#1</div>
                          <div className="text-gray-300 mt-3">in China</div>
                          <div className="text-gray-300 text-xs mt-1">Box Office History</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="md:col-span-1 md:pl-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center">
                  <Star className="mr-2" /> Reviews
                </h2>
                <div className="grid grid-cols-1 gap-6 max-w-lg">
                  <RatingCard 
                    site="IMDb"
                    logo="/images/imdb-logo.png"
                    score={ratings.imdb.score}
                    votes={ratings.imdb.votes}
                    url="https://www.imdb.com/title/tt34956443/"
                    starColor="text-yellow-400"
                  />
                  <RatingCard 
                    site="豆瓣"
                    logo="/images/douban-logo.ico"
                    score={ratings.douban.score}
                    votes={ratings.douban.votes}
                    url="https://movie.douban.com/subject/34780991/"
                    starColor="text-green-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="mb-16 mt-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Film className="mr-2" /> Movie Poster
          </h2>
          <Link to="/posters" className="block">
            <div className="max-w-sm mx-auto group">
              <img 
                src="/bigposts/homepage_post.webp" 
                alt="Movie Poster" 
                className="w-full aspect-[2/3] object-cover transition-transform group-hover:scale-105 rounded-lg" 
                loading="lazy"
                decoding="async"
              />
              <div className="mt-4 text-center">
                <span className="text-white text-lg font-semibold group-hover:text-blue-300 transition-colors">
                  View All 25 Posters
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* Mythology Background */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <BookOpen className="mr-2" /> The Legend of Ne Zha
          </h2>
          <div className="bg-blue-800 bg-opacity-30 p-8 rounded-lg space-y-6">
            {/* Origins */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Ancient Origins</h3>
              <p className="text-lg leading-relaxed">
                Ne Zha's legend originates from ancient Chinese mythology and folklore, with roots tracing back to 
                the classic novel "Investiture of the Gods" (封神演义) and even earlier folk tales. The character 
                may have evolved from Indian Buddhist deities - the Naga (serpent gods) and Prince Nalakuvara, 
                before being incorporated into Chinese Taoist mythology during the Tang Dynasty.
              </p>
            </div>

            {/* Classic Story */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">The Classic Tale</h3>
              <p className="text-lg leading-relaxed">
                In the most well-known version, Ne Zha is the third son of General Li Jing in Chen Tang Pass. 
                Born with extraordinary powers, he wielded magical weapons including the Universe Ring, 
                Sky-walking Wheels, and Red Armillary Sash. The most famous story tells of his conflict with 
                the Dragon King of the Eastern Sea, leading to his ultimate sacrifice - dismembering his own 
                body to save his people, only to be reborn from a lotus flower by his master.
              </p>
            </div>

            {/* Modern Adaptations */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">Cultural Impact</h3>
              <p className="text-lg leading-relaxed">
                Ne Zha's story has been continuously reimagined through centuries in various art forms - from 
                traditional opera and shadow puppetry to modern animations. Notable adaptations include the 
                1979 classic "Ne Zha Conquers the Dragon King" and the 2019 blockbuster "Ne Zha Reborn". Each 
                retelling reinforces the core themes of rebellion against fate, sacrifice for the greater good, 
                and the eternal struggle between destiny and free will.
              </p>
            </div>

            {/* Modern Interpretation */}
            <div>
              <h3 className="text-2xl font-semibold mb-3">A Timeless Legend</h3>
              <p className="text-lg leading-relaxed">
                This new adaptation brings the ancient legend into a contemporary setting, while preserving 
                the essence of Ne Zha's spirit - a determined warrior who defies destiny to protect the innocent. 
                The film reimagines these age-old themes for modern audiences, demonstrating how this 
                centuries-old tale remains relevant today.
              </p>
            </div>
          </div>
        </section>
      </div>
      <ScrollToTop />
    </>
  );
};

export default HomePage; 