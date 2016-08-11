import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import { getData } from '../actions/data';
import { GDAX, BITSTAMP, KRAKEN } from '../constants/ExchangeNames';
import Form from '../components/Form';
import styles from '../styles/App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    function tick() {
      // i don't think this is how it's supposed to be done
      // check this
      console.log('ticked!');
      dispatch(getData(GDAX));
      dispatch(getData(BITSTAMP));
      dispatch(getData(KRAKEN));
    }
    tick();
    this.interval = setInterval(tick, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className={styles.app}>
        <Helmet
          title={this.props.title}
        />
        { /* wrap in a div so it will be flexbox'd as a group */ }
        <div>
          <h1 className={styles.title}>Bitcoin Converter</h1>
          <Form data={this.props.data} />
          <p>Updates once every 10 seconds</p>
          <p>Last Updated {moment(this.props.lastUpdated).format('HH:mm:ss')}</p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default App;