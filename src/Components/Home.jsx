import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovieDetails, getMoviesByTitle } from "../api/omdb";
import Auth from "./Auth";
import Search from "./Search";
import MovieList from "./MovieList";
import Watchlist from "./WatchList";
import { FaEdit, FaHome } from "react-icons/fa";
import MovieDetails from "./MovieDetail";

const Home = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [isEditingListName, setIsEditingListName] = useState(false);
  const [listName, setListName] = useState("Create a list");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    if (userEmail) {
      const savedWatchlist =
        JSON.parse(localStorage.getItem(`watchlist_${userEmail}`)) || [];
      setWatchlist(savedWatchlist);
    }
  }, [userEmail]);

  const handleSearch = async (title) => {
    const results = await getMoviesByTitle(title);
    setSearchResults(results);
    setCurrentView("list");
    setSelectedMovieId(null);
  };

  const handleAddToWatchlist = async (id) => {
    const movie = await getMovieDetails(id);
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem(
      `watchlist_${userEmail}`,
      JSON.stringify(updatedWatchlist)
    );
  };

  const handleRemoveFromWatchlist = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem(
      `watchlist_${userEmail}`,
      JSON.stringify(updatedWatchlist)
    );
  };

  const showWatchlist = () => {
    setCurrentView("watchlist");
    setSelectedMovieId(null);
  };

  const handleListNameEdit = () => {
    setIsEditingListName(true);
  };

  const handleListNameSave = (newName) => {
    setListName(newName);
    setIsEditingListName(false);
  };

  const handleMovieSelect = (id) => {
    setSelectedMovieId(id);
    setCurrentView("details");
  };

  const handleHomeClick = () => {
    setCurrentView("list");
    setSelectedMovieId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/auth");
  };

  if (!userEmail) {
    return <Auth />;
  }

  return (
    <div className="Home container mx-auto p-4 flex flex-col items-center">
      <div className="w-full ">
        <div className="flex justify-between sm:flex-row sm:space-x-8 p-4">
          <p className="text-3xl font-bold text-red-500 mb-4 sm:mb-0">WatchLists</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded mb-4 sm:mb-0"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 sm:pr-4">
            <Search onSearch={handleSearch} />
            <button
              onClick={handleHomeClick}
              className="bg-red-500 text-white p-2 rounded mt-2 w-full flex items-center justify-center"
            >
              <FaHome />
            </button>
            <hr className="my-4 border-gray-300" />
            <div className="font-medium text-2xl">My lists</div>
            <p
              className="cursor-pointer flex items-center justify-between mt-2"
              onClick={showWatchlist}
            >
              {isEditingListName ? (
                <input
                  type="text"
                  className="border-b border-red-500"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                  onBlur={() => handleListNameSave(listName)}
                  autoFocus
                />
              ) : (
                <>
                  {listName}
                  <FaEdit
                    className="ml-2 cursor-pointer"
                    onClick={handleListNameEdit}
                  />
                </>
              )}
            </p>
          </div>
          <div className="border-r border-gray-300 sm:hidden"></div>
          <div className="flex-1 mt-4 sm:mt-0">
            {currentView === "list" && (
              <MovieList
                movies={searchResults}
                onAddToWatchlist={handleAddToWatchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                onSearch={handleSearch}
                watchlist={watchlist}
                onMovieSelect={handleMovieSelect}
              />
            )}
            {currentView === "watchlist" && (
              <Watchlist
                movies={watchlist}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
                onMovieSelect={handleMovieSelect}
              />
            )}
            {currentView === "details" && selectedMovieId && (
              <MovieDetails movieId={selectedMovieId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
