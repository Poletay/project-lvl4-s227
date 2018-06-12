import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StatusBar from './StatusBar';
import connect from '../connect';


const mapStateToProps = ({ requestsState: { channelDeletingState } }) => {
  const props = {
    httpRequestState: channelDeletingState,
  };
  return props;
};

@connect(mapStateToProps)
export default class RemoveChannelForm extends React.Component {
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
    this.setState({
      modal: false,
    });
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  deleteChannel = (e) => {
    e.preventDefault();
    const { channelId } = this.props;

    this.props.deleteChannel({ channelId });
  }

  render() {
    const {
      buttonName,
      className,
      channelName,
      httpRequestState,
    } = this.props;

    return (
      <div style={{ display: 'inline' }}>
        <Button size="sm" color="secondary" onClick={this.showModal}>{buttonName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={className}>
          <ModalHeader toggle={this.toggleModal}>Delete channel <b>{`"${channelName}"`}</b>.</ModalHeader>
          <ModalBody>
            <StatusBar statusType={httpRequestState} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteChannel}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.hideModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
