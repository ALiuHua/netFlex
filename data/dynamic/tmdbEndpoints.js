// const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_KEY = "75d815a7423ee9ff009585239a370212";

export const TMDB = {
  TVShows: {
    sections: [
      {
        title: "Popular on NexFlex",
        endpoint: `/tv/popular?api_key=${API_KEY}`,
      },
      {
        title: "Trending Now",
        endpoint: `/trending/tv/day?api_key=${API_KEY}&page=_pageNumber`,
      },
      {
        title: "War Politics",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10768&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Netflex Original",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_networks=213&with_watch_providers=8&watch_region=AU`,
        size: "large",
      },
      {
        title: "Sci-Fi & Fantasy",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10765&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Documentary",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=99&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Comedy",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Animation",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=16&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Drama",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Family",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Mystery",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Action-Adventure",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10759&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Crime",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Reality",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10764&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Talk",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10767&with_watch_providers=8&watch_region=AU`,
      },
    ],
    helpers: {
      search: `/search/tv?api_key=${API_KEY}&query=_query`,
      fetchGenres: `genre/tv/list?api_key=${API_KEY}`,
      fetchTrailers: `/tv/_id/videos?api_key=${API_KEY}`,
      fetchDetails: `/tv/_id?api_key=${API_KEY}`,
      fetchCredits: `/tv/_id/aggregate_credits?api_key=${API_KEY}`,
      fetchRecommendations: `/tv/_id/recommendations?api_key=${API_KEY}`,
      fetchTVSeason: `/tv/_id/season/_seasonNumber?api_key=${API_KEY}`,
      fetchSimilar: `/tv/_id/similar?api_key=${API_KEY}&language=en-US&page=1`,
      // searchTV: `/search/tv?api_key=${API_KEY}&query=_query`,
      // fetchTVGenres: `genre/tv/list?api_key=${API_KEY}`,
      // fetchTVTrailers: `/tv/_id/videos?api_key=${API_KEY}`,
      // fetchTVDetails: `/tv/_id?api_key=${API_KEY}`,
      // fetchTVAggregateCredits: `/tv/_id/aggregate_credits?api_key=${API_KEY}`,
      // fetchTVRecommendations: `/tv/_id/recommendations?api_key=${API_KEY}`,
      // fetchTVSeason: `/tv/_id/season/_seasonNumber?api_key=${API_KEY}`,
    },
  },
  movies: {
    sections: [
      {
        title: "Popular on NexFlex",
        endpoint: `/movie/popular?api_key=${API_KEY}&region=AU`,
      },
      {
        title: "Trending Now",
        endpoint: `/trending/movie/day?api_key=${API_KEY}`,
      },
      {
        title: "Upcoming",
        endpoint: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=AU`,
      },
      {
        title: "NetFlex Original",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_networks=213&with_watch_providers=8&watch_region=AU`,
        size: "large",
      },
      {
        title: "Playing in Australian Cinemas",
        endpoint: `movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=AU`,
      },
      {
        title: "Sci-Fi",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=878&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Drama",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Fantasy",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=14&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Crime",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Mystery",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Action",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=28&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Comedy",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Animation",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=16&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Adventure",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=12&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Family",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "TV",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10770&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Documentary",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=99&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "War",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10752&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "History",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=36&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Western",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=37&with_watch_providers=8&watch_region=AU`,
      },
      {
        title: "Thriller",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=53&with_watch_providers=8&watch_region=AU`,
      },
    ],
    helpers: {
      search: `/search/movie?api_key=${API_KEY}&query=_query`,
      fetchGenres: `genre/movie/list?api_key=${API_KEY}`,
      fetchTrailers: `/movie/_id/videos?api_key=${API_KEY}`,
      fetchDetails: `/movie/_id?api_key=${API_KEY}`,
      fetchRecommendations: `/movie/_id/recommendations?api_key=${API_KEY}`,
      fetchCredits: `/movie/_id/credits?api_key=${API_KEY}`,
      fetchSimilar: `/movie/_id/similar?api_key=${API_KEY}&language=en-US&page=1`,
      // searchMovie: `/search/movie?api_key=${API_KEY}&query=_query`,
      // fetchMovieGenres: `genre/movie/list?api_key=${API_KEY}`,
      // fetchMovieTrailers: `/movie/_id/videos?api_key=${API_KEY}`,
      // fetchMovieDetails: `/movie/_id?api_key=${API_KEY}`,
      // fetchMovieRecommendations: `/movie/_id/recommendations?api_key=${API_KEY}`,
      // fetchMovieCredits: `/movie/_id/credits?api_key=${API_KEY}`,
    },
  },
  browse: {
    sections: [
      {
        title: "Popular TV Show on NexFlex",
        endpoint: `/tv/popular?api_key=${API_KEY}`,
        type: "TVShows",
      },
      {
        title: "Popular movie on NexFlex",
        endpoint: `/movie/popular?api_key=${API_KEY}&region=AU`,
        type: "movies",
      },
      {
        title: "Trending Now",
        endpoint: `/trending/tv/day?api_key=${API_KEY}&page=_pageNumber`,
        type: "TVShows",
      },
      {
        title: "Upcoming",
        endpoint: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=AU`,
        type: "movies",
      },
      {
        title: "Netflex Original TV shows",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_networks=213&with_watch_providers=8&watch_region=AU`,
        size: "large",
        type: "TVShows",
      },
      {
        title: "NetFlex Original movies",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_networks=213&with_watch_providers=8&watch_region=AU`,
        size: "large",
        type: "movies",
      },
      {
        title: "Comedy",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Drama",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Family",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Mystery",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Action-Adventure",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10759&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Crime",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Reality",
        endpoint: `/discover/tv?api_key=${API_KEY}&with_genres=10764&with_watch_providers=8&watch_region=AU`,
        type: "TVShows",
      },
      {
        title: "Sci-Fi",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=878&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Drama",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=18&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Fantasy",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=14&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Crime",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=80&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Mystery",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=9648&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Action",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=28&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Comedy",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=35&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Animation",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=16&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Adventure",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=12&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Family",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10751&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "TV",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10770&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Documentary",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=99&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "War",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=10752&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "History",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=36&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Western",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=37&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
      {
        title: "Thriller",
        endpoint: `/discover/movie?api_key=${API_KEY}&with_genres=53&with_watch_providers=8&watch_region=AU`,
        type: "movies",
      },
    ],
  },
};
