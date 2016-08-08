import React, { PropTypes } from 'react';
import styles from '../styles/Form.css';

const Form = ({ btc, usd, onBtcChange, onUsdChange }) => {
  // @todo - create component for input and then create containers for USD and BTC
  // (or just pass that info via props)
  return (
    <form className={styles.form}>
      <input
        type="text"
        className={styles.input}
        value={btc}
        onChange={onBtcChange}
      />
      <input
        type="text"
        className={styles.input}
        value={usd}
        onChange={onUsdChange}
      />
    </form>
  );
};

Form.propTypes = {
  btc: PropTypes.string,
  usd: PropTypes.string,
  onBtcChange: PropTypes.func.isRequired,
  onUsdChange: PropTypes.func.isRequired,
};

export default Form;