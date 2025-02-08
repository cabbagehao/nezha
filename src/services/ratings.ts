// 定义评分数据类型
export interface Rating {
  score: string;
  votes: string;
}

export interface Ratings {
  imdb: Rating;
  douban: Rating;
}

// 添加缓存
const CACHE_KEY = 'movie_ratings';
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const FALLBACK_DATA = {
  imdb: { score: '8.2', votes: '811' },
  douban: { score: '8.5', votes: '850.5K' }
};

const API_BASE_URL = 'https://nezha.yhc.so/api';

export const fetchRatings = async (): Promise<Ratings> => {
  try {
    // 先尝试从缓存获取
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TIME) {
        return data;
      }
    }

    // 设置超时
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('/api/ratings', {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
    
    return data;
  } catch (error) {
    console.error('Failed to fetch ratings:', error);
    // 使用缓存的数据作为后备
    return FALLBACK_DATA;
  }
}; 