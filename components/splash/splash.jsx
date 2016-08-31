import React from 'react';
import StartSplash from './start_splash';
import AuthSplash from './auth_splash';
import OnlineConfigs from './online_configs';
import FirebaseConfig from '../../js/firebase_config';
const hashHistory = require('react-router').hashHistory;

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Splash extends React.Component {
  constructor () {
    super();
    this.state = {
      configsContainerClass: "online-config-container-hide",
      onlineConfigLog: []
     };
    this.toggleOnlineConfigs = this.toggleOnlineConfigs.bind(this);
  }

  toggleOnlineConfigs () {
    let klass = this.state.configsContainerClass === "online-config-container-hide" ? "online-config-container-show" : "online-config-container-hide";
    this.setState({ configsContainerClass: klass });
    this.initiateOnline();
  }

  linkToGame () {
    hashHistory.push('online_game');
  }

  initiateOnline () {
    let user = firebase.auth().currentUser;
    let config = new FirebaseConfig(user, this.linkToGame.bind(this));
    console.log("config", config);
    console.log("config log", config.log);
    this.setState({ onlineConfigLog: config.log });
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
              configLogs={this.state.onlineConfigLog}
              />
          </div>
          <AuthSplash />
        </div>
      </div>
    );
  }
}
