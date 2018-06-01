const host = '';

export default {
  addMessageUrl: channelId => [host, 'api/v1', 'channels', channelId, 'messages'].join('/'),
  addChannelUrl: () => [host, 'api/v1', 'channels'].join('/'),
  deleteChannelUrl: channelId => [host, 'api/v1', 'channels', channelId].join('/'),
};
