// 定义评分数据类型
export interface Rating {
  score: string;
  votes: string;
}

export interface Ratings {
  imdb: Rating;
  douban: Rating;
}

// 获取评分数据的函数
export async function fetchRatings(): Promise<Ratings> {
  try {
    const response = await fetch('http://localhost:3001/api/ratings');
    if (!response.ok) {
      throw new Error('Failed to fetch ratings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ratings:', error);
    return {
      imdb: { score: '8.2', votes: '811' },
      douban: { score: '8.5', votes: '850.5K' }
    };
  }
} 