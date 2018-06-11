import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = ({ requestsState: { channelRenamingState } }) => {
  const props = {
    httpRequestState: channelRenamingState,
  };
  return props;
};

@connect(mapStateToProps)
class RenameChannelForm extends React.Component {
  state = {
    modal: false,
    isHttpRequestPending: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.isHttpRequestPending && nextProps.httpRequestState === 'successed') {
      this.setState({
        isHttpRequestPending: false,
        modal: false,
      });
    }
    if (this.state.isHttpRequestPending && nextProps.httpRequestState === 'failed') {
      this.setState({
        isHttpRequestPending: false,
      });
    }
  }

  onSubmit = (values) => {
    const { channelId } = this.props;
    this.setState({
      isHttpRequestPending: true,
    });
    this.props.changeChannelName(values, { channelId });
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
              <Field className="mt-2 mb-2 w-100 p-2 border border-secondary rounded" name="text" placeholder="Channel Name" required component="input" type="text" />
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
