/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import WelcomePage from './assets/WelcomePage/WelcomePage';
import MultiplicationTable from './assets/MultiplicationTable/MultiplicationTable';
import QuitGame from './assets/QuitGame/QuitGame';

function App() {
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');


  const handleUserSubmit = (name, gender) => {
    setUserName(name);
    setUserGender(gender);
  };


  const renderContent = () =>
    !userName || !userGender ? (
      <WelcomePage onUserSubmit={handleUserSubmit} />
    ) : (
      <>
        <MultiplicationTable userName={userName} userGender={userGender} />
        <QuitGame
          userName={userName}
          userGender={userGender}
        />
      </>
    );

  return <div>{renderContent()}</div>;
}

export default App;
