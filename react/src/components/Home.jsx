import React from 'react';
import Sock from './Sock';
import AddSock from './AddSock';

const Home = ({ data, handleDelete, setData }) => {
  const handleAdd = (newSock) => {
    setData(prev => [...prev, newSock]); //append new sock to list
  }
  return (
    <>
     <h4 className='mt-5 mb-4'>Sock Listings</h4>
    <div className="card-container d-flex flex-wrap gap-3">
      {data.map(sock => (
        <Sock key={sock._id} data={sock} handleDelete={handleDelete} />
      ))}
    </div>
    </>
  );
};

export default Home;
