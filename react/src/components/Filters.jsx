import React, { useState } from 'react';
import '../styles/Filters.css';

const Filters = ({ filters, setFilters, data }) => {
  const sizes = [...new Set(data.map(sock => sock.sockDetails?.size))];
  const conditions = [...new Set(data.map(sock => sock.sockDetails?.condition))];
  const materials = [...new Set(data.map(sock => sock.sockDetails?.material))];

  const [openDropdown, setOpenDropdown] = useState('');

  const handleSelect = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setOpenDropdown('');
  };

  const handleClear = () => {
    setFilters({ size: '', condition: '', material: '' });
  };

  const renderDropdown = (label, name, options) => (
    <div className="dropdown me-2">
      <button
        className="btn btn-outline-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setOpenDropdown(openDropdown === name ? '' : name)}
      >
        {filters[name] || `All ${label}`}
      </button>
      <ul className={`dropdown-menu scrollable-menu ${openDropdown === name ? 'show' : ''}`}>
        <li>
          <button className="dropdown-item" onClick={() => handleSelect(name, '')}>
            All {label}
          </button>
        </li>
        {options.map((val, idx) => (
          <li key={idx}>
            <button className="dropdown-item" onClick={() => handleSelect(name, val)}>
              {val}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="container mb-3">
      <div className="card">
        <div className="card-body">
        <h4 className="card-title mb-3 text-center" style={{ color: '#000000' }}>Refine Your Sock Search</h4>
          <div className="d-flex flex-wrap justify-content-center align-items-start filter-bar">
            {renderDropdown('Sizes', 'size', sizes)}
            {renderDropdown('Conditions', 'condition', conditions)}
            {renderDropdown('Materials', 'material', materials)}
            <button className="btn btn-outline-danger mt-2 mt-md-0" onClick={handleClear}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
