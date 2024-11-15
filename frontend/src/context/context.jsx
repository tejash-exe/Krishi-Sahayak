import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext(" ");

export const AppProvider = ({ children }) => { 
  
  const [language, setlanguage] = useState("English");
  const [welcome, setwelcome] = useState(false);
  const [isAuth, setisAuth] = useState((localStorage.getItem("isAuth")) || false);
  const [name, setname] = useState((localStorage.getItem("name")) || "");
  const [phone, setphone] = useState((localStorage.getItem("phone")) || "");
  const [cart, setcart] = useState((localStorage.getItem("cart")) || []);
  const [reward, setreward] = useState((localStorage.getItem("reward")) || 0);
  const [address, setaddress] = useState(JSON.parse(localStorage.getItem("address")) || {});

  useEffect(() => {
    localStorage.setItem("isAuth",(isAuth));
  }, [isAuth]);
  
  useEffect(() => {
    localStorage.setItem("name", (name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem("phone", (phone));
  }, [phone]);

  useEffect(() => {
    localStorage.setItem("cart", (cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("reward", (reward));
  }, [reward]);
  
  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  return (
    <AppContext.Provider value={{ 
      language, 
      setlanguage, 
      welcome, 
      setwelcome, 
      isAuth, 
      setisAuth, 
      name, 
      setname,
      phone, 
      setphone,
      cart, 
      setcart,
      reward, 
      setreward,
      address, 
      setaddress,
    }}>
      {children}
    </AppContext.Provider>
  );
};
