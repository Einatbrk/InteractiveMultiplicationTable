/* eslint-disable no-unused-vars */

import React from 'react';
import './UserScore.css';

const UserScore = ({ correctAnswers }) => {

  return (
    <div className='score-grade'>
      <p>ציון: {correctAnswers}</p>
    </div>
  );
};

export default UserScore;
