// 定义评分数据类型
export interface Rating {
  score: string;
  votes: string;
}

export interface Ratings {
  imdb: Rating;
  douban: Rating;
}

/* 将来用于从 API 获取评分
const CACHE_KEY = 'movie_ratings';
const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const FALLBACK_DATA: Ratings = {
  imdb: { score: '8.2', votes: '811' },
  douban: { score: '8.5', votes: '850.5K' }
};

const API_BASE_URL = 'https://nezha.yhc.so/api';
*/

/* 将来用于验证 API 返回的数据
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
*/ 