import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    // convert to array so it can be processed by ../util/average.js
    // convert to objects for easier handling (dot property access, for one)
    data: state.data.toArray().map(item => item.toObject()),
  };
};

const AppContainer = connect(
  mapStateToProps
)(App);

export default AppContainer;