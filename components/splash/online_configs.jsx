import React from 'react';
const hashHistory = require('react-router').hashHistory;

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class OnlineConfig extends React.Component {
  constructor (props) {
    super(props);
  }

  showConfigs () {
    return this.props.configLogs.map((log, logId) => {
      return (
        <p key={logId}>{log}</p>
      );
    });
  }

  linkToGame () {
    hashHistory.push('online_game');
  }

  render () {
    return (
      <div className={this.props.configsContainerClass}>
        {this.showConfigs()}
        <div className="start-button" onClick={() => this.linkToGame()}>
          begin!
        </div>
      </div>
    );
  }
}
