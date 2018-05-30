import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.currentChannelId,
    userName: state.user,
  };
  return props;
};

@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  addMessage = (values) => {
    this.props.addMessage(values, this.props.currentChannelId, this.props.userName);
    this.props.reset();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.addMessage)}>
          <div>
            <Field className="w-100 p-2 border border-secondary rounded" name="text" placeholder="Message" required component="input" type="text" />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
