const host = '';

export default {
  getAddMessageUrl: channelId => [host, 'api/v1', 'channels', channelId, 'messages'].join('/'),
  getAddChannelUrl: () => [host, 'api/v1', 'channels'].join('/'),
  getDeleteChannelUrl: channelId => [host, 'api/v1', 'channels', channelId].join('/'),
  getRenameChannelUrl: channelId => [host, 'api/v1', 'channels', channelId].join('/'),
};
