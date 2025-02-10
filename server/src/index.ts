import express from 'express';
import cors from 'cors';
import { getRatings } from './scraper';

const app = express();
const port = process.env.PORT || 3001;

// 启用 CORS
app.use(cors());

// 缓存评分数据
let cachedRatings: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

app.get('/api/ratings', async (req, res) => {
  try {
    const now = Date.now();
    
    // 如果缓存存在且未过期，返回缓存数据
    if (cachedRatings && (now - lastFetchTime < CACHE_DURATION)) {
      return res.json(cachedRatings);
    }

    // 获取新数据
    const ratings = await getRatings();
    
    // 更新缓存
    cachedRatings = ratings;
    lastFetchTime = now;

    res.json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({
      error: 'Failed to fetch ratings',
      douban: { score: '8.5', votes: '850.5K' },
      imdb: { score: '8.2', votes: '811' }
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 