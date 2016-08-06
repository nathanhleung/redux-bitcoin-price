import React from 'react';
import Ticker from './Ticker';
import Subtitle from './Subtitle';

const appStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
  textAlign: 'center',
  fontFamily: 'Reem Kufi',
  background: '#eee',
  color: '#333',
};

const App = () => {
  return (
    <div style={appStyle}>
      { /* Wrap in a div to vertically center entire block */ }
      <div>
        <Ticker />
        <Subtitle />
      </div>
    </div>
  );
};

export default App;