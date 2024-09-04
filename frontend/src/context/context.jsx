import React, { createContext, useState } from 'react';

export const AppContext = createContext(" ");

export const AppProvider = ({ children }) => { 
  
  const [language, setlanguage] = useState("English");

  return (
    <AppContext.Provider value={{ language, setlanguage }}>
      {children}
    </AppContext.Provider>
  );
};
