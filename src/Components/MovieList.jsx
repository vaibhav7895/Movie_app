import React from "react";
import MovieItem from "./MovieItem";
import { FaBookmark } from "react-icons/fa";
import Search from "./Search";

function MovieList({
  movies,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  onSearch,
  watchlist,
  onMovieSelect,
}) {
  const isMovieInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.imdbID === movieId);
  };

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="border-2 border-red-500 rounded-xl p-4 mb-4">
        <p className="text-2xl md:text-3xl lg:text-4xl mb-2">
          Welcome To <span className="text-red-500">WatchLists</span>
        </p>
        <p className="text-sm md:text-base lg:text-lg mb-2">
          Browse movies, add them to watchlists and share them with friends
        </p>
        <p className="flex items-center text-sm md:text-base lg:text-lg space-x-2 md:space-x-4 lg:space-x-6 ">
          Just click the
          <FaBookmark className="text-blue-500 m-1 md:m-2 lg:m-3 text-xl md:text-2xl lg:text-3xl" />
          to add a movie, the poster to see more details
        </p>
      </div>
      <Search onSearch={onSearch} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieItem
            key={movie.imdbID}
            movie={movie}
            onAddToWatchlist={onAddToWatchlist}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            isWatchlistItem={isMovieInWatchlist(movie.imdbID)}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
