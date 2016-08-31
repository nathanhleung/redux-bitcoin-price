import React, { PropTypes } from 'react';
import { BTC, USD } from '../constants/CurrencyCodes';
import InputContainer from '../containers/InputContainer';
import CurrencySelectContainer from '../containers/CurrencySelectContainer';
import styles from '../styles/Form.css';

// @todo perhaps the selects should be their own component
const Form = ({ data }) => {
  return (
    <form className={styles.form}>
      <InputContainer currency={BTC} data={data} />
      <CurrencySelectContainer />
      {' = '}
      <InputContainer currency={USD} data={data} />
      <CurrencySelectContainer fiat={true} />
    </form>
  );
};

export default Form;