/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';


const QuitGame = ({ userName, userGender, userNameScore }) => {
  const message = userGender === 'girl' ? 'האם את בטוחה שברצונך לפרוש?' : 'האם אתה בטוח שברצונך לפרוש?';
  const [showQuitModal, setShowQuitModal] = useState(false);
  const handleQuit = () => {
    const userScore = { userNameScore };
    console.log(`${userNameScore}`);
    const userRecord = { userName, userNameScore };
    console.log( JSON.stringify(userRecord));

    const savedRecords = JSON.parse(localStorage.getItem('quitRecords')) || [];
    const updatedRecords = [...savedRecords, userRecord];

    localStorage.setItem('quitRecords', JSON.stringify(updatedRecords));
    handleCloseModal();
  };

  const handleCloseModal = () => setShowQuitModal(false);
  const handleShowModal = () => setShowQuitModal(true);


  return (
    <>
      <button onClick={handleShowModal}>יציאה</button>
    </>
  );
};

export default QuitGame;
