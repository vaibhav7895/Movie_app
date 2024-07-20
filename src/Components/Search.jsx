import React, { useState } from "react";

function Search({ onSearch }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(title);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search for movies"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded mt-2 w-full"
        >
          Search
        </button>
      </form>
    </>
  );
}

export default Search;
