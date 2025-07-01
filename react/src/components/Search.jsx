import React, { useState } from 'react';

const Search = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      alert("Please enter a color to search.");
      return;
    }

    fetch(`${import.meta.env.VITE_SOCKS_API_URL}/search`, {
      method: "POST",
      body: JSON.stringify({ color: searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) return response.json().then(err => { throw err });
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          props.setData(data);
        } else {
          alert(`No socks found matching "${searchTerm}".`);
        }
      })
      .catch((error) => {
        console.error("Search failed:", error);
        alert(error.message || "Search failed. Please try again.");
      });
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm("");

    fetch(import.meta.env.VITE_SOCKS_API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch socks.");
        return response.json();
      })
      .then((allSocks) => {
        props.setData(allSocks);
        console.log("Successfully reset search filter.");
        alert("Sock list reset!");
      })
      .catch((err) => {
        console.error("Reset failed:", err);
        alert("Failed to reset sock list.");
      });
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search by color (e.g., Red)"
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success" type="submit">Search</button>
      <button className="btn btn-outline-secondary" type="button" onClick={handleReset}>Reset</button>
    </form>
  );
};

export default Search;
