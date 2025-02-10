// 定义评分数据类型
export interface Rating {
  score: string;
  votes: string;
}

export interface Ratings {
  imdb: {
    score: string;
    votes: string;
  };
  douban: {
    score: string;
    votes: string;
  };
}

// 添加缓存
const CACHE_KEY = 'movie_ratings';
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const FALLBACK_DATA: Ratings = {
  imdb: { score: '8.2', votes: '811' },
  douban: { score: '8.5', votes: '850.5K' }
};

const API_BASE_URL = 'https://nezha.yhc.so/api';

export async function fetchRatings(): Promise<Ratings> {
  try {
    const response = await fetch(`${API_BASE_URL}/ratings`);
    
    // 检查 Content-Type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type:', contentType);
      return FALLBACK_DATA;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 尝试解析 JSON
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      return FALLBACK_DATA;
    }

    // 验证返回的数据结构
    if (!isValidRatings(data)) {
      console.error('Invalid ratings data structure:', data);
      return FALLBACK_DATA;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch ratings:', error);
    return FALLBACK_DATA;
  }
}

// 验证返回的数据结构是否符合预期
function isValidRatings(data: any): data is Ratings {
  return (
    data &&
    typeof data === 'object' &&
    'imdb' in data &&
    'douban' in data &&
    typeof data.imdb?.score === 'string' &&
    typeof data.imdb?.votes === 'string' &&
    typeof data.douban?.score === 'string' &&
    typeof data.douban?.votes === 'string'
  );
} 