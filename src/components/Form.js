import React, { PropTypes } from 'react';
import styles from '../styles/Form.css';

const Form = ({ active, usd, btc, onUsdChange, onBtcChange }) => {
  // @todo - create component for input and then create containers for USD and BTC
  // (or just pass that info via props)
  // also pass active in a prop
  return (
    <form className={styles.form}>
      <input
        type="text"
        className={[styles.input, active === 'BTC' ? styles.active : undefined].join(' ')}
        value={btc}
        onChange={onBtcChange}
      />
      <select>
        <option>BTC</option>
      </select>
      {' = '}
      <input
        type="text"
        className={[styles.input, , active === 'USD' ? styles.active : undefined].join(' ')}
        value={usd}
        onChange={onUsdChange}
      />
      <select>
        <option>USD</option>
      </select>
    </form>
  );
};

Form.propTypes = {
  active: PropTypes.string.isRequired,
  btc: PropTypes.string.isRequired,
  usd: PropTypes.string.isRequired,
  onBtcChange: PropTypes.func.isRequired,
  onUsdChange: PropTypes.func.isRequired,
};

export default Form;