export interface Movie {
  rank: number;
  title: string;
  boxOffice: string;
  year: number;
  country: string;
  posterUrl?: string;
}

export const topMovies: Movie[] = [
  { rank: 1, title: "Avatar", boxOffice: "$2.92B", year: 2009, country: "USA" },
  { rank: 2, title: "Avengers: Endgame", boxOffice: "$2.80B", year: 2019, country: "USA" },
  { rank: 3, title: "Avatar: The Way of Water", boxOffice: "$2.32B", year: 2022, country: "USA" },
  { rank: 4, title: "Titanic", boxOffice: "$2.26B", year: 1997, country: "USA" },
  { rank: 5, title: "Star Wars: The Force Awakens", boxOffice: "$2.07B", year: 2015, country: "USA" },
  { rank: 6, title: "Avengers: Infinity War", boxOffice: "$2.05B", year: 2018, country: "USA" },
  { rank: 7, title: "Spider-Man: No Way Home", boxOffice: "$1.92B", year: 2021, country: "USA" },
  { rank: 8, title: "Inside Out 2", boxOffice: "$1.70B", year: 2024, country: "USA" },
  { rank: 9, title: "Jurassic World", boxOffice: "$1.67B", year: 2015, country: "USA" },
  { rank: 10, title: "The Lion King", boxOffice: "$1.66B", year: 2019, country: "USA" },
  { rank: 11, title: "The Avengers", boxOffice: "$1.52B", year: 2012, country: "USA" },
  { rank: 12, title: "Furious 7", boxOffice: "$1.52B", year: 2015, country: "USA" },
  { rank: 13, title: "Top Gun: Maverick", boxOffice: "$1.50B", year: 2022, country: "USA" },
  { rank: 14, title: "Frozen II", boxOffice: "$1.45B", year: 2019, country: "USA" },
  { rank: 15, title: "Barbie", boxOffice: "$1.45B", year: 2023, country: "USA" },
  { rank: 16, title: "Avengers: Age of Ultron", boxOffice: "$1.40B", year: 2015, country: "USA" },
  { rank: 17, title: "Ne Zha 2", boxOffice: "$1.39B", year: 2025, country: "China", posterUrl: "/bigposts/homepage_post.webp" },
  { rank: 18, title: "The Super Mario Bros. Movie", boxOffice: "$1.36B", year: 2023, country: "Japan" },
  { rank: 19, title: "Black Panther", boxOffice: "$1.35B", year: 2018, country: "USA" },
  { rank: 20, title: "Harry Potter and the Deathly Hallows – Part 2", boxOffice: "$1.34B", year: 2011, country: "UK" },
  { rank: 21, title: "Deadpool & Wolverine", boxOffice: "$1.34B", year: 2024, country: "USA" },
  { rank: 22, title: "Star Wars: The Last Jedi", boxOffice: "$1.33B", year: 2017, country: "USA" },
  { rank: 23, title: "Jurassic World: Fallen Kingdom", boxOffice: "$1.31B", year: 2018, country: "USA" },
  { rank: 24, title: "Frozen", boxOffice: "$1.29B", year: 2013, country: "USA" },
  { rank: 25, title: "Beauty and the Beast", boxOffice: "$1.26B", year: 2017, country: "USA" }
];

// 获取票房第一的电影数据
export const getTopMovie = () => topMovies.find(movie => movie.title === "Ne Zha 2");

// 获取前N名电影
export const getTopMovies = (count: number) => topMovies.slice(0, count); 