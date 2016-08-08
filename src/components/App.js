import React, { Component, PropTypes } from 'react';
import { getData } from '../actions/data';
import FormContainer from '../containers/FormContainer';
import styles from '../styles/App.css';

class App extends Component {
  componentDidMount() {
    // set polling here
    const { dispatch } = this.props;
    dispatch(getData());
  }
  render() {
    return (
      <div className={styles.app}>
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
  dispatch: PropTypes.func.isRequired,
};

export default App;