import React from 'react';
import PropTypes from 'prop-types';



const ButtonRound = ({ size, fontSize, title, color, backgroundColor }) => {
  const borderWidth = 1;



  return (
    <div style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
      borderColor: color,
      width: size, height: size,
      borderRadius: size,
      borderWidth: borderWidth,
    }}>
      <div style={{
        textAlign: 'center',
        fontWeight: 'bold',
        color: color,
        fontSize,
        lineHeight: 6,
      }}>
        {title}
      </div>
    </div>
  )
}

ButtonRound.propTypes = {
  size: PropTypes.any,
  fontSize: PropTypes.any,
  title: PropTypes.any,
  color: PropTypes.any,
  backgroundColor: PropTypes.any
};
export default ButtonRound;