import React, { PropTypes } from 'react';
import styles from '../styles/Input.css';

const Input = ({ active, value, onChange }) => {
  const activeClass = active ? styles.active : undefined;
  return (
    <input
      type="text"
      className={[styles.input, activeClass].join(' ')}
      value={value}
      onChange={onChange}
    />
  );  
};

Input.propTypes = {
  active: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;