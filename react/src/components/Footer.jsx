import React from 'react';

const Footer = (props) => {
  const environment = import.meta.env.VITE_ENVIRONMENT;

  // kind of hard coded but i wanted to try using the ternary
  const bgClass = environment === 'development' ? 'bg-yellow' : 'bg-green';

  return (
    <footer className={`text-muted ${bgClass}`} style={{ textAlign: 'center', fontWeight: 'bold' }}>
      <div style = {{
        color: 'black'
      }}><strong>{environment.toUpperCase()}</strong></div>
    </footer>
  );
};

export default Footer;
