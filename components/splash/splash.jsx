import React from 'react';
import StartSplash from './start_splash';
import AuthSplash from './auth_splash';
import OnlineConfigs from './online_configs';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Splash extends React.Component {
  constructor () {
    super();
    this.state = { configsContainerClass: "online-config-container-hide" };
    this.toggleOnlineConfigs = this.toggleOnlineConfigs.bind(this);
  }

  toggleOnlineConfigs () {
    let klass = this.state.configsContainerClass === "online-config-container-hide" ? "online-config-container-show" : "online-config-container-hide";
    this.setState({ configsContainerClass: klass });
  }

  render () {
    return (
      <div className="splash-container">
        <div className="top">
          <div className="header-container">
            <h1>TETRAGON</h1>
          </div>
        </div>
        <div className="bottom">
          <div className="bottom-top">
            <StartSplash
              toggleOnlineConfigs={this.toggleOnlineConfigs}
              />
            <OnlineConfigs
              configsContainerClass={this.state.configsContainerClass}
              />
          </div>
          <AuthSplash />
        </div>
      </div>
    );
  }
}
