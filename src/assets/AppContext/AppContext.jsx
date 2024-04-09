/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// AppContext.js
import React, { createContext, useContext, useState } from 'react';

 export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userNameScore, setUserNameScore] = useState(0);


  const updateUser = (name, gender, score) => {
    setUserName(name);
    setUserGender(gender);
    setUserNameScore(score);
  };
  const handleUserSubmit = (name, gender) => {
    setUserName(name);
    setUserGender(gender);
  };


  const contextValue = {
    userName,
    userGender,
    userNameScore,
    updateUser,
    handleUserSubmit,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
