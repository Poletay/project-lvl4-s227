import React from 'react';
import { Field, reduxForm } from 'redux-form';

class NewMessageForm extends React.Component {
  addMessage = () => {}
  render() {
    return (
      <div className="new-message-area">
        <form className="new-message-form" onSubmit={this.props.handleSubmit(this.addMessage)}>
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
