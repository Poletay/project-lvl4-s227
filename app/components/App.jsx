import React from 'react';
import ChannelsList from './ChannelsList';
import ChatArea from './ChatArea';
import ChatHeader from './ChatHeader';
import NewMessageForm from './NewMessageForm';

const App = () => (
  <div className="container-fluid h-100">
    <div className="row h-100">
      <div className="col-3 p-3 h-100 bg-secondary text-white">
        <ChannelsList />
      </div>
      <div className="col-9 h-100">
        <div className="card h-100">
          <div className="card-header text-secondary">
            <ChatHeader />
          </div>
          <div className="card-body" style={{ overflow: 'auto' }}>
            <ChatArea />
          </div>
          <div className="card-footer">
            <NewMessageForm />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
