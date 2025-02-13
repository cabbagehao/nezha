import React, { useState } from 'react';
import Navigation from './Navigation';
import ScrollToTop from './ScrollToTop';
import { Maximize2, X } from 'lucide-react';
import './BoxOffice.css';

interface Movie {
  rank: number;
  title: string;
  boxOffice: string;
  year: number;
  country: string;
}

const BoxOfficePage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const movies: Movie[] = [
    { rank: 1, title: "Avatar", boxOffice: "$2.92B", year: 2009, country: "USA" },
    { rank: 2, title: "Avengers: Endgame", boxOffice: "$2.80B", year: 2019, country: "USA" },
    { rank: 3, title: "Avatar: The Way of Water", boxOffice: "$2.32B", year: 2022, country: "USA" },
    { rank: 4, title: "Titanic", boxOffice: "$2.26B", year: 1997, country: "USA" },
    { rank: 5, title: "Star Wars: The Force Awakens", boxOffice: "$2.07B", year: 2015, country: "USA" },
    { rank: 6, title: "Avengers: Infinity War", boxOffice: "$2.05B", year: 2018, country: "USA" },
    { rank: 7, title: "Spider-Man: No Way Home", boxOffice: "$1.92B", year: 2021, country: "USA" },
    { rank: 8, title: "Inside Out 2", boxOffice: "$1.70B", year: 2024, country: "USA" },
    { rank: 9, title: "Jurassic World", boxOffice: "$1.67B", year: 2015, country: "USA" },
    { rank: 10, title: "The Lion King", boxOffice: "$1.66B", year: 2019, country: "USA" },
    { rank: 11, title: "The Avengers", boxOffice: "$1.52B", year: 2012, country: "USA" },
    { rank: 12, title: "Furious 7", boxOffice: "$1.52B", year: 2015, country: "USA" },
    { rank: 13, title: "Top Gun: Maverick", boxOffice: "$1.50B", year: 2022, country: "USA" },
    { rank: 14, title: "Frozen II", boxOffice: "$1.45B", year: 2019, country: "USA" },
    { rank: 15, title: "Barbie", boxOffice: "$1.45B", year: 2023, country: "USA" },
    { rank: 16, title: "Avengers: Age of Ultron", boxOffice: "$1.40B", year: 2015, country: "USA" },
    { rank: 17, title: "The Super Mario Bros. Movie", boxOffice: "$1.36B", year: 2023, country: "Japan" },
    { rank: 18, title: "Ne Zha 2", boxOffice: "$1.35B", year: 2025, country: "China" },
    { rank: 19, title: "Black Panther", boxOffice: "$1.35B", year: 2018, country: "USA" },
    { rank: 20, title: "Harry Potter and the Deathly Hallows – Part 2", boxOffice: "$1.34B", year: 2011, country: "UK" },
    { rank: 21, title: "Deadpool & Wolverine", boxOffice: "$1.34B", year: 2024, country: "USA" },
    { rank: 22, title: "Star Wars: The Last Jedi", boxOffice: "$1.33B", year: 2017, country: "USA" },
    { rank: 23, title: "Jurassic World: Fallen Kingdom", boxOffice: "$1.31B", year: 2018, country: "USA" },
    { rank: 24, title: "Frozen", boxOffice: "$1.29B", year: 2013, country: "USA" },
    { rank: 25, title: "Beauty and the Beast", boxOffice: "$1.26B", year: 2017, country: "USA" }
  ];

  return (
    <div className="box-office">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-3">Global Box Office Rankings</h1>
          <p className="text-lg text-gray-300 mb-8">
            Ne Zha 2 ranks #18 in global box office history
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
                className={`rankings-row ${movie.title === "Ne Zha 2" ? "highlight" : ""}`}
              >
                <div className="rank-col">#{movie.rank}</div>
                <div className="poster-col">
                  <div className="poster-thumbnail">
                    <img 
                      src={`/films/${movie.title.replace(/:/g, '')}.jpg`} 
                      alt={`${movie.title} poster`}
                      onClick={() => setSelectedImage(`/films/${movie.title.replace(/:/g, '')}.jpg`)}
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