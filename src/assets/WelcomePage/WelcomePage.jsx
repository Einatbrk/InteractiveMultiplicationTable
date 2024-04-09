/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {ImgButton} from '../Buttons/ImgButton.jsx';
import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import boyImage from '/boy.JPG?url';
import girlImage from '/girl.JPG?url';

const WelcomePage = ({ onUserSubmit }) => {
  const [userName, setUserName] = useState('');
  const [userGender, setUserGender] = useState('');
  const [borderColor, setBorderColor] = useState({
    boy: 'initialPictureSetting',
    girl: 'initialPictureSetting',
  });

  const handleUserSubmit = () => {
    (userName && userGender)?onUserSubmit(userName, userGender):alert('יש למלא את כל השדות')
    }


  const handleGenderButtonClick = (gender) => {
    setUserGender((prevGender) => (prevGender === gender ? '' : gender));
    setBorderColor((prevColors) => ({
      ...prevColors,
      [gender]: prevColors[gender] === 'initialPictureSetting'?
      (gender === 'boy' ? 'boy' : 'girl')
      : 'initialPictureSetting',
    }));

  };

  useEffect(() => {
    switch (userGender) {
      case 'boy':
        setBorderColor({ boy: 'boy', girl: 'initialPictureSetting' });
        break;
      case 'girl':
        setBorderColor({ girl: 'girl', boy: 'initialPictureSetting' });
        break;
      default:
        setBorderColor({ boy: 'initialPictureSetting', girl: 'initialPictureSetting' });
        break;
    }
  }, [userGender]);

  return (
    <div className="welcome-container">
      <div>
        <div className="user-name-request">
          <label htmlFor="name-input">אנא הכנס את שמך</label>
          <br />
          <input
            id="name-input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="gender-buttons">
        <ImgButton src={boyImage} alt="Boy" className={`initialPictureSetting ${borderColor.boy}`} onClick={() => handleGenderButtonClick('boy')} />
        <ImgButton src={girlImage} alt="Girl" className={`initialPictureSetting ${borderColor.girl}`} onClick={() => handleGenderButtonClick('girl')} />
      </div>
      <div>
        <button className="start-button" onClick={handleUserSubmit}>התחל</button>
      </div>
    </div>
  );
};
export default WelcomePage;
