import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookingInfo, setBookingInfo] = useState({});

  return (
    <AuthContext.Provider value={{ user, setUser, bookingInfo, setBookingInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
