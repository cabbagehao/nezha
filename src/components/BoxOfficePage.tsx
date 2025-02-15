import React, { useState } from 'react';
import Navigation from './Navigation';
import ScrollToTop from './ScrollToTop';
import { Maximize2, X } from 'lucide-react';
import './BoxOffice.css';
import { topMovies } from '../data/movieData';

interface Movie {
  rank: number;
  title: string;
  boxOffice: string;
  year: number;
  country: string;
}

const BoxOfficePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const movies = topMovies;

  return (
    <div className="box-office">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">Global Box Office Rankings</h1>
          <p className="text-lg text-gray-300 mb-8">
            Ne Zha 2 ranks #17 in global box office history
          </p>

          <div className="rankings-table">
            <div className="rankings-header">
              <div className="rank-col">Rank</div>
              <div className="poster-col">Poster</div>
              <div className="title-col">Title</div>
              <div className="country-col">Country</div>
              <div className="box-office-col">Box Office</div>
              <div className="year-col">Year</div>
            </div>
            
            {movies.map((movie) => (
              <div 
                key={movie.rank} 
                className={`rankings-row ${movie.title === "Ne Zha: Mo tong nao hai" ? "highlight" : ""}`}
              >
                <div className="rank-col">#{movie.rank}</div>
                <div className="poster-col">
                  <div className="poster-thumbnail">
                    <img 
                      src={`/films/${movie.title.replace(/:/g, '')}${
                        movie.title === 'Ne Zha 2' ? '.webp' : '.jpg'
                      }`}
                      alt={`${movie.title} poster`}
                      onClick={() => setSelectedImage(`/films/${movie.title.replace(/:/g, '')}${
                        movie.title === 'Ne Zha 2' ? '.webp' : '.jpg'
                      }`)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="title-col">{movie.title}</div>
                <div className="country-col">
                  <img 
                    src={`/films/country/${movie.country}.svg`} 
                    alt={movie.country}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src.endsWith('.svg')) {
                        target.src = `/films/country/${movie.country}.png`;
                      }
                    }}
                    className="country-flag"
                  />
                </div>
                <div className="box-office-col">{movie.boxOffice}</div>
                <div className="year-col">{movie.year}</div>
              </div>
            ))}
          </div>

          <div className="reference-link">
            Data source: <a href="https://en.wikipedia.org/wiki/List_of_highest-grossing_films#Highest-grossing_films" 
            target="_blank" 
            rel="noopener noreferrer">Wikipedia - List of highest-grossing films</a>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            <img 
              src={selectedImage} 
              alt="Movie poster"
            />
          </div>
        </div>
      )}
      
      <ScrollToTop />
    </div>
  );
};

export default BoxOfficePage; 