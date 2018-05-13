import React from 'react';
import ChannelsList from '../containers/ChannelsList';
import ChatArea from '../containers/ChatArea';
import NewMessageForm from '../containers/NewMessageForm';

const App = () => (
  <div className="main-row">
    <div className="left-panel">
      <ChannelsList />
    </div>
    <div className="main-panel">
      <ChatArea />
      <NewMessageForm />
    </div>
  </div>
);

export default App;
