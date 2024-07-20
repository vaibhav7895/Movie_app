import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../api/omdb";

function MovieDetails({ movieId }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await getMovieDetails(movieId);
      setMovie(details);
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} className=" mb-4" />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      
    </div>
  );
}

export default MovieDetails;
