import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
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

  toggle = () => {
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
    return (
      <div style={{ display: 'inline' }}>
        <Button size="sm" color="secondary" onClick={this.toggle}>{this.props.buttonName}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete channel.</ModalHeader>
          <ModalBody>
            <Button color="primary" onClick={this.deleteChannel}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
