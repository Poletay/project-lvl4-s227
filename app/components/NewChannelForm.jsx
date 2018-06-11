import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = ({ requestsState: { channelAddingState } }) => {
  const props = {
    channelAddingState,
  };
  return props;
};

@connect(mapStateToProps)
class NewChannelForm extends React.Component {
  state = {
    modal: false,
    isHttpRequestPending: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.isHttpRequestPending && nextProps.channelAddingState === 'successed') {
      this.setState({
        isHttpRequestPending: false,
        modal: false,
      });
    }
  }

  onSubmit = (values) => {
    if (!values.text) {
      return;
    }

    this.setState({
      isHttpRequestPending: true,
    });

    this.props.addChannel(values);
  }

  toggle = () => {
    this.props.reset();
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const disabled = this.state.isHttpRequestPending;
    return (
      <div style={{ display: 'inline' }}>
        <Button size="sm" color="secondary" onClick={this.toggle}>{this.props.buttonName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add new channel.</ModalHeader>
          <ModalBody>
            Add new channel to channels list.
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field disabled={disabled} className="w-100 p-2 border border-secondary rounded" name="text" placeholder="Channel Name" required component="input" type="text" />
              <Button disabled={disabled} type="submit" color="primary">Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Close</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'newChannel',
})(NewChannelForm);
