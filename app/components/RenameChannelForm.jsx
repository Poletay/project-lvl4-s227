import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = () => {
  const props = {};
  return props;
};

@connect(mapStateToProps)
class RenameChannelForm extends React.Component {
  state = {
    modal: false,
  };

  onSubmit = (values) => {
    const { channelId } = this.props;
    this.props.changeChannelName(values, { channelId });
    this.toggle();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.props.reset();
  }

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button size="sm" color="secondary" onClick={this.toggle}>{this.props.buttonName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Rename the channel.</ModalHeader>
          <ModalBody>
            Set new channel Name.
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field className="w-100 p-2 border border-secondary rounded" name="text" placeholder="Channel Name" required component="input" type="text" />
              <Button type="submit" color="primary">Submit</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelForm);
