import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const currentChannelName = channels.find(c => c.id === currentChannelId).name;
  return { currentChannelName };
};

@connect(mapStateToProps)
export default class ChatHeader extends React.Component {
  render() {
    return (
      <div>
        <h4>Current channel is: {<strong>{this.props.currentChannelName}</strong>}</h4>
      </div>
    );
  }
}
