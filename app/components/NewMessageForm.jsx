import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';
import UserContext from './UserContext';

const mapStateToProps = ({ user, channels: { currentChannelId } }) => {
  const props = {
    currentChannelId,
    userName: user,
  };
  return props;
};

@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  addMessage = userName => (values) => {
    if (!values.text) {
      return;
    }
    this.props.addMessage(values, this.props.currentChannelId, userName);
    this.props.reset();
  }

  render() {
    return (
      <div>
        <UserContext.Consumer>
          { ({ userName }) => (
            <form onSubmit={this.props.handleSubmit(this.addMessage(userName))}>
              <div className="input-group-prepend w-100">
                <button className="input-group-text" id="new-message" onClick={this.props.handleSubmit(this.addMessage(userName))}>@</button>
                <Field className="form-control" name="text" placeholder="Message" required component="input" type="text" aria-describedby="new-message" />
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
