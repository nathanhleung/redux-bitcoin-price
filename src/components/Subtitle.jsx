import React from 'react';

const subtitleStyle = {
  fontSize: '2rem',
};

const Subtitle = () => {
  return (
    <div style={subtitleStyle}>
      USD/BTC
      <br />
      <small>Updates once per minute</small>
    </div>
  );  
};

export default Subtitle;