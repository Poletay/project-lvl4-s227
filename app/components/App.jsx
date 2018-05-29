import React from 'react';
import ChannelsList from '../components/ChannelsList';
import ChatArea from '../components/ChatArea';
import NewMessageForm from '../components/NewMessageForm';

const App = () => (
  <div className="container-fluid h-100">
    <div className="row h-100">
      <div className="col-2 p-3 h-100 bg-secondary text-white">
        <ChannelsList />
      </div>
      <div className="col-10 h-100">
        <div className="card h-100">
          <div className="card-header text-secondary">
            <h4>SLACK</h4>
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
