import React from 'react';

const renderMessages = (messages, currentChannelId) => {
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
};

const ChatArea = ({ messages, currentChannelId }) => (
  <div className="container-fluid">
    {renderMessages(messages, currentChannelId)}
  </div>
);

export default ChatArea;
