import React from 'react';
import { Button } from 'reactstrap';
import NewChannelForm from './NewChannelForm';
import connect from '../connect';
import RemoveChannelForm from './RemoveChannelForm';
import RenameChannelForm from './RenameChannelForm';

const mapStateToProps = ({ channels: { channelsList } }) => {
  const props = { channels: channelsList };
  return props;
};

@connect(mapStateToProps)
export default class ChannelsList extends React.Component {
  onClick = currentChannelId => (e) => {
    e.preventDefault();
    this.props.changeChannel({ currentChannelId });
  }

  renderChannels = () => {
    const { channels } = this.props;
    const channelsList = channels.map(c => (
      <li key={c.id}>
        <Button color="link" onClick={this.onClick(c.id)}>{c.name}</Button>
        {c.removable ? <RenameChannelForm buttonName="R" channelId={c.id} /> : ''}
        {c.removable ? <RemoveChannelForm buttonName="D" channelId={c.id} /> : ''}
      </li>
    ));
    return (
      <div>
        <div>
          <h4>Channels:</h4>
          <ul>
            {channelsList}
          </ul>
        </div>
        <NewChannelForm buttonName="New channel" />
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
