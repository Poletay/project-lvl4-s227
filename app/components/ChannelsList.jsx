import React from 'react';
import { Button } from 'reactstrap';
import NewChannelForm from './NewChannelForm';
import connect from '../connect';
import RemoveChannelForm from './RemoveChannelForm';

const mapStateToProps = ({ channels }) => {
  const props = { channels };
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
        {c.removable ? <RemoveChannelForm channelId={c.id} /> : ''}
      </li>
    ));
    return (
      <div>
        <div>
          <h4>Channels <span>+</span></h4>
          <ul>
            {channelsList}
          </ul>
        </div>
        <div>
          <NewChannelForm />
        </div>
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
