import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
import * as actionCreators from '../actions';

export default connect(
  ({ channels }) => {
    const props = { channels };
    return props;
  },
  actionCreators,
)(Component);
