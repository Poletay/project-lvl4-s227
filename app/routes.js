const host = '';

export default {
  addMessageUrl: channelId => [host, 'api/v1', 'channels', channelId, 'messages'].join('/'),
};
