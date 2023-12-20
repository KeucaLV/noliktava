import React, { createContext, useContext, useState } from 'react';

// Create a context to manage user-related data
const UserContext = createContext();

// Create a provider component to wrap your application and provide user-related data
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state is null

  // Add any additional user-related functions or states you may need

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the user context in functional components
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
