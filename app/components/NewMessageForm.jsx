import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import UserContext from './UserContext';

const mapStateToProps = ({
  user,
  channels: { currentChannelId },
  requestsState: { messageSendingState },
}) => {
  const props = {
    currentChannelId,
    userName: user,
    messageSendingState,
  };
  return props;
};

@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  state = {
    isHttpRequestPending: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.isHttpRequestPending && nextProps.messageSendingState === 'successed') {
      this.setState({
        isHttpRequestPending: false,
      });
      nextProps.reset();
    }
    if (this.state.isHttpRequestPending && nextProps.messageSendingState === 'failed') {
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
    return (
      <div>
        <UserContext.Consumer>
          { ({ userName }) => (
            <form onSubmit={this.props.handleSubmit(this.addMessage(userName))}>
              <div className="input-group-prepend w-100">
                <button disabled={disabled} className="input-group-text" id="new-message" onClick={this.props.handleSubmit(this.addMessage(userName))}>@</button>
                <Field disabled={disabled} className="form-control" name="text" placeholder="Message" required component="input" type="text" aria-describedby="new-message" />
              </div>
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
