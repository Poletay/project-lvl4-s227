import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ messages, currentChannelId }) => {
  const props = { messages, currentChannelId };
  return props;
};

@connect(mapStateToProps)
export default class ChatArea extends React.Component {
  renderMessages = (messages, currentChannelId) => {
    const messageList = messages.filter(m => m.channelId === currentChannelId).map(m => (
      <div className="container-fluid" key={m.id}>
        <div>
          <b>{m.autor}</b>
        </div>
        <div>
          {m.text}
        </div>
        <br />
      </div>
    ));
    return messageList;
  }

  render() {
    return (
      <div className="container-fluid">
        {this.renderMessages(this.props.messages, this.props.currentChannelId)}
      </div>
    );
  }
}
