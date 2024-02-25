/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

export const ImgButton = ({ src, alt, onClick, className }) => {
  const buttonStyle = {
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <button className={`image-button ${className}`} onClick={onClick} style={buttonStyle}>
    </button>
  );
};
