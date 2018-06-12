import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ requestsState }) => {
  const props = {
    requestsState,
  };
  return props;
};

const statusList = {
  requested: {
    classNames: 'alert-warning',
    statusText: 'Request in progress',
  },
  failed: {
    classNames: 'alert-danger',
    statusText: 'Last request is failed',
  },
};

@connect(mapStateToProps)
export default class StatusBar extends React.Component {
  render() {
    const { statusType } = this.props;
    const status = statusList[statusType];
    const statusContent = status ? (
      <div className={status.classNames}>
        {status.statusText}
      </div>
    ) : '';
    return statusContent;
  }
}
