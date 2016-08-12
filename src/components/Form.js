import React, { PropTypes } from 'react';
import { BTC, USD } from '../constants/CurrencyCodes';
import InputContainer from '../containers/InputContainer';
import styles from '../styles/Form.css';


// @todo perhaps the selects should be their own component
const Form = ({ data }) => {
  return (
    <form className={styles.form}>
      <InputContainer currency={BTC} data={data} />
      <select className={styles.select}>
        <option>BTC</option>
      </select>
      {' = '}
      <InputContainer currency={USD} data={data} />
      <select className={styles.select}>
        <option>USD</option>
      </select>
    </form>
  );
};

export default Form;