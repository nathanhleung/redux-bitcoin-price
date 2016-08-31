import React, { PropTypes } from 'react';
import { BTC, USD } from '../constants/CurrencyCodes';
// react-select css is loaded in the index.jade file
import Select from 'react-select';
import { isEmpty } from 'lodash';
import styles from '../styles/Select.css';

const CurrencySelect = ({ value, currList, fiat, onChange }) => {
  let options;
  if (fiat) {
    options = [{
      value: USD,
      label: 'USD',
    }];
    options = options.concat(currList.map(curr => ({
      value: curr,
      label: curr,
    })));
  } else {
    options = [{
      value: BTC,
      label: 'BTC',
    }];
  }
  return (
    <div className={styles.container}>
      <Select
        className={styles.select}
        value={value}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

CurrencySelect.propTypes = {
  value: PropTypes.string.isRequired,
  currList: PropTypes.array, // @todo make these required after fixing cryptos
  fiat: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CurrencySelect;