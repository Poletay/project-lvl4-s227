import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import UserContext from './UserContext';
import StatusBar from './StatusBar';

const mapStateToProps = ({
  user,
  channels: { currentChannelId },
  requestsState: { messageSendingState },
}) => {
  const props = {
    currentChannelId,
    userName: user,
    httpRequestState: messageSendingState,
  };
  return props;
};

@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  state = {
    isHttpRequestPending: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.isHttpRequestPending && nextProps.httpRequestState === 'successed') {
      this.setState({
        isHttpRequestPending: false,
      });
      nextProps.reset();
    }
    if (this.state.isHttpRequestPending && nextProps.httpRequestState === 'failed') {
      this.setState({
        isHttpRequestPending: false,
      });
    }
  }

  addMessage = userName => (values) => {
    if (!values.text) {
      return;
    }
    this.setState({
      isHttpRequestPending: true,
    });
    this.props.addMessage(values, this.props.currentChannelId, userName);
  }

  render() {
    const disabled = this.state.isHttpRequestPending;
    const {
      handleSubmit,
      httpRequestState,
    } = this.props;
    return (
      <div>
        <UserContext.Consumer>
          { ({ userName }) => (
            <form onSubmit={handleSubmit(this.addMessage(userName))}>
              <div className="input-group-prepend w-100">
                <button disabled={disabled} type="submit" className="input-group-text" id="new-message">@</button>
                <Field disabled={disabled} className="form-control" name="text" placeholder="Message" required component="input" type="text" aria-describedby="new-message" />
              </div>
              <StatusBar statusType={httpRequestState} />
            </form>
          )}
        </UserContext.Consumer>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
