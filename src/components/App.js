import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { getData } from '../actions/data';
import { GDAX, BITSTAMP, KRAKEN } from '../constants/ExchangeNames';
import FormContainer from '../containers/FormContainer';
import styles from '../styles/App.css';

class App extends Component {
  componentDidMount() {
    // set polling here
    const { dispatch } = this.props;
    dispatch(getData(GDAX));
    dispatch(getData(BITSTAMP));
    dispatch(getData(KRAKEN));
  }
  render() {
    return (
      <div className={styles.app}>
        <Helmet
          title={this.props.currentVal}
        />
        { /* wrap in a div so it will be flexbox'd as a group */ }
        <div>
          <h1 className={styles.title}>Bitcoin Converter</h1>
          <FormContainer data={this.props.data} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  currentVal: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default App;