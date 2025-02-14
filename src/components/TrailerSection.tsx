import React, { useState, useEffect } from 'react';

const TrailerSection: React.FC = () => {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    // 使用 requestIdleCallback 在浏览器空闲时加载视频
    const loadVideo = () => {
      setShouldLoadVideo(true);
    };

    if ('requestIdleCallback' in window) {
      // @ts-ignore
      window.requestIdleCallback(loadVideo, { timeout: 2000 });
    } else {
      // 如果浏览器不支持 requestIdleCallback，则使用 setTimeout
      setTimeout(loadVideo, 2000);
    }
  }, []);

  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-blue-800 bg-opacity-30">
      {shouldLoadVideo ? (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/kDFpzlVwQHg"
          title="Nezha 2 Official Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white">Loading trailer...</div>
        </div>
      )}
    </div>
  );
};

export default TrailerSection; 