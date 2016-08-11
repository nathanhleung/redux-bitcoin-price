import React, { PropTypes } from 'react';
import { BTC, USD } from '../constants/CurrencyCodes';
import InputContainer from '../containers/InputContainer';
import styles from '../styles/Form.css';

const Form = ({ data }) => {
  return (
    <form className={styles.form}>
      <InputContainer currency={BTC} data={data} />
      <select>
        <option>BTC</option>
      </select>
      {' = '}
      <InputContainer currency={USD} data={data} />
      <select>
        <option>USD</option>
      </select>
    </form>
  );
};

export default Form;