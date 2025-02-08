import React from 'react';

const TrailerSection: React.FC = () => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe 
        width="1065" 
        height="599" 
        src="https://www.youtube.com/embed/nsXQijb0F4I" 
        title="NeZha 2 International Trailer | 《哪吒2》 国际预告片" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        className="w-full h-[500px] rounded-lg"
        loading="lazy"
      />
    </div>
  );
};

export default TrailerSection; 