import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ channels }) => {
  const props = { channels };
  return props;
};

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  renderChannels = () => {
    const { channels } = this.props;
    const channelsList = channels.map(c => (
      <li key={c.id}>
        {c.name}
      </li>
    ));
    return (
      <div>
        <h4>Channels <span>+</span></h4>
        <ul>
          {channelsList}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderChannels()}
      </div>
    );
  }
}
