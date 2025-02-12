import React from 'react';
import Navigation from './Navigation';
import ScrollToTop from './ScrollToTop';
import './Posters.css';

const PostersPage: React.FC = () => {
  // 使用 import.meta.glob 获取所有海报图片
  const posterFiles = import.meta.glob('/public/bigposts/*.{jpg,webp}', {
    eager: true,
    as: 'url'
  });

  // 转换为数组并提取文件名
  const posters = Object.keys(posterFiles).map(path => {
    const fileName = path.split('/').pop() || '';
    return fileName;
  });

  return (
    <div className="posters-page">
      <Navigation />
      
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Movie Posters</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posters.map((poster, index) => (
              <div 
                key={index}
                className="poster-card bg-blue-900/20 rounded-lg overflow-hidden"
              >
                <div className="poster-image-wrapper">
                  <img 
                    src={`/bigposts/${poster}`}
                    alt={`Movie Poster ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Poster {index + 1}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <ScrollToTop />
    </div>
  );
};

export default PostersPage; 