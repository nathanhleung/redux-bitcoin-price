import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import { getData } from '../actions/data';
import { getForexData } from '../actions/forexData';
import { GDAX, BITSTAMP, KRAKEN } from '../constants/ExchangeNames';
import Form from '../components/Form';
import Footer from '../components/Footer';
import styles from '../styles/App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    function tick() {
      dispatch(getData(GDAX));
      dispatch(getData(BITSTAMP));
      dispatch(getData(KRAKEN));
    }
    // Forex data is only updated once/day, so
    // we don't need to keep polling
    dispatch(getForexData());
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
          <h1 className={styles.title}>Simple Redux Bitcoin Converter</h1>
          <p className={styles.textCenter}>
            {'Index price is derived from a weighted average of bitcoin '}
            {'prices at 3 major exchanges'}
          </p>
          { /* perhaps these props should be passed in a container */ }
          <Form data={this.props.data} />
          <p className={styles.textCenter}>
            {'Updates every 10 seconds, last updated '}
            {moment(this.props.lastUpdated).format('HH:mm:ss')}
          </p>
        </div>
        <Footer />
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