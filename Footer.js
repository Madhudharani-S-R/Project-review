import React from 'react';

const Footer = () => {
  return (
    <footer style={{ padding: '30px', background: '#282c34', color: 'white', textAlign: 'center', position: 'absolute', bottom: '10', width: '100%' }}>
      <p>&copy; {new Date().getFullYear()} Movie Booking App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
