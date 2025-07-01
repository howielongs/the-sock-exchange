import Sock from "./components/Sock";
import sock_data from './assets/sock.json';
import Footer from "./components/Footer";
import Search from "./components/Search";
import Filters from './components/Filters'; // new dropdown component

import React, { useState, useEffect } from "react";
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import About from './components/About';
import Featured from "./components/Featured";
import AddSock from "./components/AddSock";

import { AuthProvider } from './hooks/AuthContext';
import RequireAuth from './components/RequireAuth';

import LoginForm from "./components/LoginForm";


function App() {
  const [data, setData] = useState([]);
  const apiURL = import.meta.env.VITE_SOCKS_API_URL //different from lab, more intuitive for me
  const [filters, setFilters] = useState({
    size: '',
    condition: '',
    material: ''
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Data could not be fetched.');
        }
        const json_response = await response.json();
        setData(json_response); //assign json response to the data variable
      } catch (error) {
        console.error('Error fetching socks: ', error);
      }
    };
    fetchData()
  }, []);

  const handleDelete = async (sockId) => {
    try {
      // Make an API request to delete the sock with the given sockId
      const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`, {
        method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Sock could not be deleted!');
        }
        // Update the state or fetch the updated data from the server
        const updatedData = data.filter(sock => sock._id !== sockId); // Remove the deleted sock from the data array
        setData(updatedData); // Update the state with the updated data
        } catch (error) {
          console.error('Error deleting sock:', error);
        }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_SOCKS_API_URL);
      const updated = await res.json();
      setData(updated); // Fetch fresh list to ensure complete data
    } catch (err) {
      console.error("Failed to refresh socks after add:", err);
    }
  };

  const filteredData = data.filter(sock => {
    const { size, condition, material } = filters;
    const details = sock.sockDetails || {};
    return (!size || details.size === size) &&
           (!condition || details.condition === condition) &&
           (!material || details.material === material);
  });
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TSE</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">
                  Add Sock
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <Search setData={setData}/>
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div className="container-fluid">
          <div className="row">
            <p>Both socks and space rockets 🚀 will take you to new heights, but only one will get cold feet!</p>
            <Featured />
            
          <AuthProvider>
            {/* Dynamic route rendering here */}
            <Routes>
              
            <Route
              path="/"
              element={
                <>
                  <Filters filters={filters} setFilters={setFilters} data={data} />
                  <Home data={filteredData} handleDelete={handleDelete} setData={setData} />
                </>
              }
            />
              <Route path="/about" element={<About />} />
              <Route path="/add"
               element = {
                  <RequireAuth>
                  <AddSock onAdd={handleAdd} />
                  </RequireAuth>
                }
              />
              <Route path = "/login" element = {<LoginForm/>} />
            </Routes>
          </AuthProvider>
            <div className="text-muted">
              <Footer environment={"Development:"}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
