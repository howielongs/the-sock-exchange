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
            props.setData(data); // Only valid arrays
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

    const handleReset = async () => {
        setSearchTerm("");
        try {
          const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
          if (!response.ok) throw new Error("Failed to fetch socks.");
          const allSocks = await response.json();
          props.setData(allSocks);
          console.log('Successfully reset search filter.');
          alert("Sock list reset!");
        } catch (err) {
          console.error("Reset failed:", err);
        }
      };

    return (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search"
                placeholder="Search" aria-label="Search"
                value={searchTerm} onChange={handleChange} />
            <button className="btn btn-outline-success" type="submit">Search</button>
            <button className="btn btn-outline-secondary" type="button" onClick={handleReset}>Reset</button>
        </form>
    );
};

export default Search;