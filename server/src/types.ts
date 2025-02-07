export interface Rating {
  score: string;
  votes: string;
}

export interface Ratings {
  imdb: Rating;
  douban: Rating;
} 