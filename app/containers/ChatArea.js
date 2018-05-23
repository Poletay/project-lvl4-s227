import { connect } from 'react-redux';
import Component from '../components/ChatArea';
import * as actionCreators from '../actions';

export default connect(
  ({ messages, currentChannelId }) => {
    const props = { messages, currentChannelId };
    return props;
  },
  actionCreators,
)(Component);
