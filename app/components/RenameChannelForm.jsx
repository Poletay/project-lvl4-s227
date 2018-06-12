import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StatusBar from './StatusBar';
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
      this.togglePendingState();
      this.hideModal();
    }
    if (this.state.isHttpRequestPending && nextProps.httpRequestState === 'failed') {
      this.togglePendingState();
    }
  }

  onSubmit = (values) => {
    const { channelId } = this.props;
    this.setState({
      isHttpRequestPending: true,
    });
    this.props.changeChannelName(values, { channelId });
  }

  togglePendingState = () => {
    this.setState({
      isHttpRequestPending: !this.state.isHttpRequestPending,
    });
  }

  showModal = () => {
    this.setState({
      modal: true,
    });
  }

  hideModal = () => {
    this.props.reset();
    this.setState({
      modal: false,
    });
  }

  toggleModal = () => {
    this.props.reset();
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const disabled = this.state.isHttpRequestPending;
    const {
      buttonName,
      className,
      handleSubmit,
      channelName,
      httpRequestState,
    } = this.props;

    return (
      <div style={{ display: 'inline' }}>
        <Button size="sm" color="secondary" onClick={this.showModal}>{buttonName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={className}>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <ModalHeader toggle={this.toggleModal}>Rename the channel.</ModalHeader>
            <ModalBody>
              Set new Name for channel <b>{`"${channelName}"`}</b>.
              <Field disabled={disabled} className="mt-2 mb-2 w-100 p-2 border border-secondary rounded" name="text" placeholder="Channel Name" required component="input" type="text" />
              <StatusBar statusType={httpRequestState} />
            </ModalBody>
            <ModalFooter>
              <div>
                <Button disabled={disabled} type="submit" color="primary">Submit</Button>
                <Button className="ml-3" color="secondary" onClick={this.hideModal}>Close</Button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'renameChannel',
})(RenameChannelForm);
