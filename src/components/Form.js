import React, { PropTypes } from 'react';
// react-select css is loaded in the index.jade file
import Select from 'react-select';
import { BTC, USD } from '../constants/CurrencyCodes';
import InputContainer from '../containers/InputContainer';
import styles from '../styles/Form.css';

// @todo perhaps the selects should be their own component
const Form = ({ data, forexData }) => {
  const cryptoOptions = [{
    value: BTC,
    label: 'BTC',
  }];
  const fiatOptions = Object.keys(forexData).map((curr) => ({
    value: curr,
    label: curr,
  }));
  return (
    <form className={styles.form}>
      <InputContainer currency={BTC} data={data} />
      <Select className={styles.select} value={BTC} options={cryptoOptions} />
      {' = '}
      <InputContainer currency={USD} data={data} />
      <Select className={styles.select} options={fiatOptions} />
    </form>
  );
};

export default Form;