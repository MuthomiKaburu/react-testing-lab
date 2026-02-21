import React from "react";

function Search({ searchText, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default Search;