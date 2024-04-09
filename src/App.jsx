/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MultiplicationTable from './assets/MultiplicationTable/MultiplicationTable';
import WelcomePage from './assets/WelcomePage/WelcomePage';
import QuitGame from './assets/QuitGame/QuitGame';

function App() {
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');

  const handleUserSubmit = (name, gender) => {
    setUserName(name);
    setUserGender(gender);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={!userName || !userGender ? <WelcomePage onUserSubmit={handleUserSubmit} /> : <MultiplicationTable userName={userName} userGender={userGender} />}
          />
          <Route
            path='/game'
            element={<MultiplicationTable userName={userName} userGender={userGender} />}
          />
          <Route
            path='/quit'
            element={<QuitGame userName={userName} userGender={userGender} onUserSubmit={handleUserSubmit}/>} 
          />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
