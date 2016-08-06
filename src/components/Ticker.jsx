import React from 'react';
import makeCancelable from '../util/make-cancelable';

const tickerStyle = {
  fontSize: '10rem',
};

const lastUpdatedStyle = {
  fontSize: '1rem',
};

function round(n) {
  return (Math.round(n * 100) / 100).toFixed(2);
}

class Ticker extends React.Component {
  constructor() {
    super();
    this.state = {
      rate: 0,
      lastUpdated: 0,
    };
  }
  
  setDocumentTitle() {
    document.title = '$' + round(this.state.rate) + ' - React Bitcoin Price Ticker';
  }
  
  async getApiData() {
    this.serverRequest = makeCancelable(
      fetch('https://apiv2.bitcoinaverage.com/constants/exchangerates/global')
    ).promise;
  	const response = await this.serverRequest;
    // response.json() returns a promise, which we can await
    const json = await response.json();
    const rate = json.rates.BTC.rate ** -1;
    return rate;
  }
  
  async tick() {
    const response = await this.serverRequest;
    if (response.bodyUsed) {
      const rate = await this.getApiData();
      this.setState({
        rate,
        lastUpdated: (new Date()).getTime(),
      });
      this.setDocumentTitle();
    }
  }
  
  componentDidMount() {
    (async () => {
      const rate = await this.getApiData();
      this.setState({
        rate,
        lastUpdated: (new Date()).getTime(),
      });
      this.setDocumentTitle();
      const seconds = 5;
      this.interval =
        setInterval(this.tick.bind(this), 1000 * seconds);
    })();
  }
  
  componentWillUnmount() {
    this.serverRequest.cancel();
    clearInterval(this.interval);
  }
  
  render() {
    return (
      <div style={tickerStyle}>
        <p style={lastUpdatedStyle}>last updated {new Date(this.state.lastUpdated).toString()}</p>
        ${round(this.state.rate)}
      </div>
    );
  }
}

export default Ticker;