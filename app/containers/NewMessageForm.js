import { connect } from 'react-redux';
import Component from '../components/NewMessageForm';
import * as actionCreators from '../actions';

export default connect(
  (state) => {
    const props = {
      currentChannelId: state.currentChannelId,
      userName: state.user,
    };
    return props;
  },
  actionCreators,
)(Component);
