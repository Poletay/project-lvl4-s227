import { connect } from 'react-redux';
import Component from '../components/NewMessageForm';
import * as actionCreators from '../actions';

export default connect(
  () => {
    const props = {};
    return props;
  },
  actionCreators,
)(Component);
