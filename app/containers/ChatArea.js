import { connect } from 'react-redux';
import Component from '../components/ChatArea';
import * as actionCreators from '../actions';

export default connect(
  (state) => {
    const props = state;
    return props;
  },
  actionCreators,
)(Component);
