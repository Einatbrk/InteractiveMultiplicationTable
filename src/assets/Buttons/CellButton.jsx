// CellButton.jsx
import React from 'react';

const CellButton = ({ cellStatus, onClick, children }) => {
  let backgroundColor = 'initial';
  cellStatus==="correct"? backgroundColor = 'green' : (cellStatus==="incorrect"? backgroundColor ='red' : backgroundColor = 'initial-button');

  return (
    <button className="cellStyle" onClick={onClick}>
      {children}
    </button>
  );
};

export default CellButton;
