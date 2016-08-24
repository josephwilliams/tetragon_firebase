import React from 'react';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class OnlineConfig extends React.Component {
  constructor (props) {
    super(props);
  }

  showConfigs () {
    return this.props.configLogs.map(log => {
      return (
        <p>{log}</p>
      );
    });
  }

  render () {
    return (
      <div className={this.props.configsContainerClass}>
        {this.showConfigs()}
      </div>
    );
  }
}
