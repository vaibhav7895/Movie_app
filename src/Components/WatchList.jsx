import React from 'react';
import MovieItem from './MovieItem';

function Watchlist({ movies, onRemoveFromWatchlist, onMovieSelect }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <p className="text-gray-600 text-xl font-semibold">No movies in watchlist</p>
      </div>
    );
  }

  return (
    <div className="">
      <div className='text-4xl font-semibold p-4 text-red-500'>
      Watchlist
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieItem 
            key={movie.imdbID} 
            movie={movie} 
            onAddToWatchlist={() => {}} 
            onRemoveFromWatchlist={onRemoveFromWatchlist} 
            isWatchlistItem={true}
            onMovieSelect={onMovieSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
