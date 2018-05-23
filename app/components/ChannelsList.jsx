import React from 'react';

const renderChannels = (channels) => {
  const channelsList = channels.map(c => (
    <li key={c.id}>
      {c.name}
    </li>
  ));
  return (
    <div>
      <h4>Channels</h4>
      <ul>
        {channelsList}
      </ul>
    </div>
  );
};

const ChannelsList = ({ channels }) => (
  <div>
    {renderChannels(channels)}
  </div>
);

export default ChannelsList;
