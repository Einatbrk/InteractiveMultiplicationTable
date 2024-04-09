/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useNavigate } from'react-router-dom';
import { useContext } from 'react';
import {useAppContext} from '../AppContext/AppContext';
import './QuitModal.css';


const QuitGame = ({ userName, userGender, userNameScore }) => {
  const navigate = useNavigate();
  const message = userGender === 'girl' ? 'האם את בטוחה שברצונך לפרוש?' : 'האם אתה בטוח שברצונך לפרוש?';
  const [showQuitModal, setShowQuitModal] = useState(false);
  const handleQuit = () => {
    const userRecord = { userName, userNameScore };
    console.log( JSON.stringify(userRecord));

    const savedRecords = JSON.parse(localStorage.getItem('quitRecords')) || [];
    const updatedRecords = [...savedRecords, userRecord];

    localStorage.setItem('quitRecords', JSON.stringify(updatedRecords));
    
    handleCloseModal();
    navigate('/')


  };

  const handleCloseModal = () => setShowQuitModal(false);
  const handleShowModal = () => setShowQuitModal(true);


  return (
    <>
      <button onClick={handleShowModal}>יציאה</button>
      {showQuitModal && (
        <Modal  className='quit-modal' message={message} onConfirm={handleQuit} onCancel={handleCloseModal} />
      )}
    </>
  );
};

export default QuitGame;
