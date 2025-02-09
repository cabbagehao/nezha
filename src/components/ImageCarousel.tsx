import React, { useState, useEffect, useCallback, useRef } from 'react';
import './ImageCarousel.css';

interface ImageType {
  src: string;
  alt: string;
  loading: "lazy" | "eager";
  width: number;
  height: number;
  srcSet: string;
  sizes: string;
}

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastInteractionTime, setLastInteractionTime] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // 使用 Vite 的 glob 导入所有 webp 和 jpg 图片
  const webpModules = import.meta.glob('/public/bigposts/*.webp', {
    eager: true,
    import: 'default'
  });
  
  const jpgModules = import.meta.glob('/public/bigposts/*.jpg', {
    eager: true,
    import: 'default'
  });
  
  // 合并所有图片路径并添加 alt 文本
  const images: ImageType[] = [...Object.values(webpModules), ...Object.values(jpgModules)].map((path, index) => ({
    src: path as string,
    alt: `Nezha 2 Movie Poster ${index + 1}`,
    loading: "lazy" as const,
    width: 800,
    height: 450,
    srcSet: `${path as string} 800w, ${(path as string).replace(/\.(webp|jpg)$/, '-small.$1')} 400w`,
    sizes: "(max-width: 768px) 400px, 800px"
  }));

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setLastInteractionTime(Date.now());
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % images.length
    );
    setIsAutoPlaying(false);
    setLastInteractionTime(Date.now());
  }, [images.length]);

  useEffect(() => {
    if (images.length === 0 || !isAutoPlaying) return;

    let timer: number | null = null;

    const startTimer = () => {
      // 确保只有一个定时器在运行
      if (timer) clearInterval(timer);
      
      timer = window.setInterval(() => {
        // 检查是否应该继续自动播放
        const currentTime = Date.now();
        if (currentTime - lastInteractionTime < 4000) {
          return; // 如果距离上次交互不足4秒，不进行自动播放
        }
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      } else {
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    startTimer();

    return () => {
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [images.length, isAutoPlaying, lastInteractionTime]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setLastInteractionTime(Date.now());
  }, []);

  // 添加点击外部恢复自动播放的处理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (carouselRef.current && !carouselRef.current.contains(event.target as Node)) {
        setIsAutoPlaying(true);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // 添加下载处理函数
  const handleDownload = useCallback((event: React.MouseEvent, imageSrc: string) => {
    event.stopPropagation(); // 阻止事件冒泡
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = imageSrc.split('/').pop() || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container" ref={carouselRef}>
      <button 
        className="carousel-button prev"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        &#10094;
      </button>
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
              <button
                className="download-button"
                onClick={(e) => handleDownload(e, image.src)}
                aria-label="Download image"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button 
        className="carousel-button next"
        onClick={goToNext}
        aria-label="Next image"
      >
        &#10095;
      </button>
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