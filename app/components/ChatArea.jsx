import React from 'react';

const renderMessages = (messages, currentChannelId) => {
  const messageList = messages.filter(m => m.channelId === currentChannelId).map(m => (
    <li key={m.id}>
      {m.text}
    </li>
  ));
  return (
    <div>
      <ul>
        {messageList}
      </ul>
    </div>
  );
};

const ChatArea = ({ messages, currentChannelId }) => (
  <div className="chat-area fdfdf">
    {renderMessages(messages, currentChannelId)}
  </div>
);

export default ChatArea;
