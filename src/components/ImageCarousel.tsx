import React, { useState, useEffect } from 'react';
import './ImageCarousel.css';

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 使用 Vite 的 glob 导入所有 webp 图片
  const imageModules = import.meta.glob('/public/bigposts/*.webp', {
    eager: true,
    import: 'default'
  });
  
  // 转换为图片路径数组并添加 alt 文本
  const images = Object.values(imageModules).map((path, index) => ({
    src: path as string,
    alt: `Nezha 2 Movie Poster ${index + 1}`,
    loading: "lazy",
    width: 800,
    height: 450,
    // 添加 srcset 支持响应式图片
    srcSet: `${path} 800w, ${path.replace('.webp', '-small.webp')} 400w`,
    sizes: "(max-width: 768px) 400px, 800px"
  }));

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div 
          className="carousel-content" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img 
                src={image.src} 
                alt={image.alt}
                loading={image.loading}
                width={image.width}
                height={image.height}
                onError={(e) => console.error(`Failed to load image: ${image.src}`, e)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to poster ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel; 