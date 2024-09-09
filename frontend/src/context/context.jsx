import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext(" ");

export const AppProvider = ({ children }) => { 
  
  const [language, setlanguage] = useState("English");
  const [isAuth, setisAuth] = useState(JSON.parse(localStorage.getItem("isAuth")) || false);
  const [welcome, setwelcome] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAuth",JSON.stringify(isAuth));
  }, [isAuth]);

  return (
    <AppContext.Provider value={{ language, setlanguage, isAuth, setisAuth, welcome, setwelcome }}>
      {children}
    </AppContext.Provider>
  );
};
