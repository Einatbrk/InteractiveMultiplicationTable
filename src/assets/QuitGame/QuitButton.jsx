/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// QuitButton.jsx
import React, { useState } from "react";
import Modal from '../Modal/Modal'
import './QuitGame.css'

const QuitButton = ({ userGender, onConfirm }) => {
    const message = userGender === 'girl' ? 'האם את בטוחה שברצונך לפרוש?' : 'האם אתה בטוח שברצונך לפרוש?';
    const [showQuitModal, setShowQuitModal] = useState(false);

    const handleCloseModal = () => setShowQuitModal(false);
    const handleShowModal = () => setShowQuitModal(true);

    const handleConfirm = () => {
        onConfirm();
        handleCloseModal();
    };

    return (
        <>
            <button onClick={handleShowModal}>יציאה</button>
            {showQuitModal && (
                <Modal className="custom-modal" message={message} onConfirm={handleConfirm} onCancel={handleCloseModal} />
            )}
        </>
    )
}

export default QuitButton;
