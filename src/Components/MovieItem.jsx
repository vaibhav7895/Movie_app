import React, { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";

function MovieItem({
  movie,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  isWatchlistItem,
  onMovieSelect,
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(isWatchlistItem);

  useEffect(() => {
    setIsInWatchlist(isWatchlistItem);
  }, [isWatchlistItem]);

  const handleAddToWatchlist = (imdbID) => {
    onAddToWatchlist(imdbID);
    setIsInWatchlist(true);
  };

  const handleRemoveFromWatchlist = (imdbID) => {
    onRemoveFromWatchlist(imdbID);
    setIsInWatchlist(false);
  };

  return (
    <div className="border p-2 shadow-xl rounded-md transition ease-in-out delay-150 transform-gpu hover:scale-105">
      <div className="relative">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => onMovieSelect(movie.imdbID)}
        />
        {isInWatchlist ? (
          <FcCheckmark
            onClick={() => handleRemoveFromWatchlist(movie.imdbID)}
            className="absolute top-2 left-2 text-white text-2xl cursor-pointer"
          />
        ) : (
          <FaBookmark
            onClick={() => handleAddToWatchlist(movie.imdbID)}
            className="absolute top-2 left-2 text-white text-2xl cursor-pointer "
          />
        )}
      </div>
      <h3 className="text-lg font-bold">
        {movie.Title} ({movie.Year})
      </h3>
    </div>
  );
}

export default MovieItem;
