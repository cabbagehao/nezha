import React, { lazy, Suspense } from 'react';
import { Calendar, Star, Film, BookOpen, ArrowRight, TrendingUp, ScrollText } from 'lucide-react';
import { Ratings } from '../services/ratings';
import ScrollToTop from './ScrollToTop';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import './Home.css';
import { getTopMovie } from '../data/movieData';

const TrailerSection = lazy(() => import('./TrailerSection'));

const HomePage: React.FC = () => {
  const ratings: Ratings = {
    imdb: {
      score: '8.2',
      votes: '8.4k'
    },
    douban: {
      score: '8.5',
      votes: '1.3M'
    }
  };

  const globalReleases = [
    { date: '2025-01-29', countries: ['Mainland China'] },
    { date: '2025-02-13', countries: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'] },
    { date: '2025-02-14', countries: ['United States', 'Canada'] },
    { date: '2025-02-27', countries: ['Hong Kong'] },
    { date: 'Coming Soon', countries: ['Singapore', 'Malaysia', 'Egypt', 'South Africa', 'Pakistan', 'Japan', 'Korea'] }
  ];

  const topMovie = getTopMovie();

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
      {/* Hero Section - 优化背景图片加载 */}
      <div 
        className="relative h-[20vh] md:h-[20vh] bg-blue-900"  // 减小高度，保持响应式
      >
        <img 
          src="/images/nezha-homepage.webp"
          alt="Nezha Movie Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sizes="100vw"
          style={{ 
            objectPosition: 'center 20%'
          }}
        />
        <Navigation />
        
        <div className="absolute inset-0 bg-black bg-opacity-70">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Nezha: Mo Tong Nao Hai</h1>
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
          <div className="relative mt-8 md:mt-12">
            {/* 时间轴线 */}
            <div className="absolute hidden md:block h-0.5 bg-blue-500/30 top-1/2 left-0 right-0 -translate-y-1/2"></div>
            <div className="absolute md:hidden w-0.5 bg-blue-500/30 top-0 bottom-0 left-6"></div>
            
            <div className="flex md:flex-row flex-col gap-2 md:gap-8">
              {globalReleases.map((release, index) => {
                // 检查日期是否已过
                const isDatePassed = release.date !== 'Coming Soon' && (() => {
                  const releaseDate = new Date(release.date);
                  const today = new Date();
                  // 设置时间为 00:00:00 以只比较日期
                  releaseDate.setHours(0, 0, 0, 0);
                  today.setHours(0, 0, 0, 0);
                  return releaseDate < today;
                })();

                return (
                  <div 
                    key={index} 
                    className="relative flex-1"
                  >
                    {/* 时间点标记 */}
                    <div className={`
                      absolute md:top-1/2 top-6 md:left-1/2 left-6 w-3 h-3 md:w-4 md:h-4 rounded-full 
                      -translate-x-1/2 md:-translate-y-1/2 z-10
                      ${isDatePassed ? 'bg-orange-500/60' : 'bg-blue-500'}
                    `}>
                      <div className={`
                        absolute inset-0 rounded-full animate-ping
                        ${isDatePassed ? 'bg-orange-500/70' : 'bg-blue-500/50'}
                      `}></div>
                    </div>
                    
                    {/* 内容卡片 */}
                    <div className={`
                      bg-blue-800/30 px-3 pt-3 pb-2 md:px-6 md:pt-6 md:pb-2 rounded-lg border border-blue-500/20
                      md:w-[calc(100%-1rem)] ml-12 md:ml-0
                      ${release.date === 'Coming Soon' ? 'md:min-w-[280px]' : ''}
                      md:mb-[calc(50%+2rem)] mb-2
                      relative
                    `}>
                      <h3 className="text-base md:text-xl font-semibold mb-0.5 md:mb-2">{release.date}</h3>
                      <ul className={`list-disc list-inside ${
                        release.date === 'Coming Soon' ? 'grid grid-cols-2 gap-x-2 md:gap-x-4 text-xs md:text-sm' : 'text-sm md:text-base'
                      }`}>
                        {release.countries.map((country, idx) => (
                          <li key={idx}>{country}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Reviews and Box Office Section */}
        <section className="py-16 bg-gradient-to-b from-blue-900/50 to-blue-950/50 -mt-12 md:-mt-48">
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
                          <span className="text-3xl font-bold text-orange-400">{topMovie?.boxOffice}</span>
                          <span className="text-gray-300 ml-2">Worldwide</span>
                        </p>
                        <p className="text-lg">
                          <span className="text-2xl font-bold text-orange-400">#{topMovie?.rank}</span>
                          <span className="text-gray-300 ml-2">All-time Global Ranking</span>
                        </p>
                        <p className="text-gray-300">
                          First Chinese animated film to surpass $1.3 billion at the global box office
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
                        <div className="absolute inset-0 border-4 border-orange-500/30 rounded-full md:animate-none circle-pulse"></div>
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

        {/* Trailer Section - 移动到海报后面 */}
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

        {/* Plot Summary Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ScrollText className="mr-2" /> Plot Summary
          </h2>
          <div className="bg-blue-800/30 rounded-lg p-8 border border-blue-500/20">
            <div className="max-w-4xl">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Re-shaping the Physical Body with Perils Everywhere</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The story is a direct continuation of "Ne Zha: Birth of the Demon Child". After the Heavenly Tribulation, both Ne Zha and Ao Bing managed to preserve their souls, but their physical bodies were on the verge of dissipation. Taiyi Zhenren decided to use the Seven-colored Lotus to reshape their physical bodies. However, the process was fraught with difficulties and reached an impasse from the very beginning. Meanwhile, Shen Gongbao released the imprisoned Four Dragon Kings, and the human-form of Ao Guang, the Dragon King of the East Sea, was revealed. He threatened to leave not a single chicken or dog alive in Chentangguan, putting Ne Zha and Ao Bing in an even more dangerous situation.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Braving the Kunlun Mountains to Save Companions</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Ao Bing destroyed his newly-reshaped physical body to save Ne Zha. In return, Ne Zha, determined to save Ao Bing, decided to brave the Kunlun Mountains within seven days to obtain the celestial nectar. During his journey through the Kunlun Mountains, Ne Zha faced three unique trials. The first time, he encountered cute groundhogs with special abilities. The second time, he met the father of Shen Gongbao, whose strength should not be underestimated. The third time, he ran into Shi Ji Niangniang, who was obsessed with looking at herself in the mirror. The mirror hidden a huge secret and became an obstacle to Ne Zha's progress.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Shocking Reversal and the Truth Revealed</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The reversal of Shen Gongbao's family is a highlight of the film. He was born into the demon race and endured discrimination and exclusion in the immortal world. In an attempt to prove his worth, he chose to rebel, and his image gradually became complex and multi-faceted. He was not the real culprit who massacred Chentangguan. The real mastermind was the seemingly kind-hearted Wuliang Xianweng. He slaughtered Chentangguan and framed the dragon race, driven by racial discrimination and the pursuit of profit.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Cutting Bones and Returning the Flesh to Defend Justice</h3>
                  <p className="text-gray-300 leading-relaxed">
                    After learning the truth, Wuliang Xianweng was well-prepared and used magic to bind Ne Zha and Ao Bing. Facing the departure of his mother, Ne Zha was in extreme pain. He was willing to tear his physical body apart, "cutting bones and returning the flesh", and burst out with a powerful force to fight against Wuliang Xianweng. In the end, with his tenacious will and unyielding spirit, Ne Zha beat Wuliang Xianweng to a pulp, successfully drove the immortal race out of the East Sea, safeguarded the peace and tranquility of Chentangguan. Also, Ne Zha completed the transformation from suppressing his true nature to accepting his true self, breaking the traditional binary opposition concept of immortals and demons.
                  </p>
                </div>
              </div>
            </div>
          </div>
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