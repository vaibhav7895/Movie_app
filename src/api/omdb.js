const API_KEY = '2f780f1f';
const BASE_URL = `https://www.omdbapi.com/?&apikey=${API_KEY}`;

export const getMoviesByTitle = async (title) => {
  const response = await fetch(`${BASE_URL}&s=${title}`);
  const data = await response.json();
  return data.Search || [];
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}&i=${id}`);
  const data = await response.json();
  return data;
};
