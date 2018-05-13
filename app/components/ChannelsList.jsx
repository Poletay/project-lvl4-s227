import React from 'react';

const renderChannels = (channels) => {
  const channelsList = channels.map(c => (
    <li className="channels-item" key={c.id}>
      {c.name}
    </li>
  ));
  return (
    <div className="channels-area">
      <h4 className="channels-header">Channels</h4>
      <ul className="channels-list">
        {channelsList}
      </ul>
    </div>
  );
};

const ChannelsList = ({ channels }) => {
  return (
    <div>
      {renderChannels(channels)}
    </div>
  );
};

export default ChannelsList;
