import React from 'react';
import AnonymousLogin from './auth/anon_auth';
import GoogleLogin from './auth/google_auth';
import FacebookLogin from './auth/facebook_auth';
import SplashProfile from './splash_profile';
import SplashProfileAnon from './splash_profile_anon';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class AuthSplash extends React.Component {
  constructor () {
    super();
    this.state = { user: null };
    this.checkCurrentUser = this.checkCurrentUser.bind(this);
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
  }

  componentDidMount () {
    this.checkCurrentUser();
  }

  checkCurrentUser () {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({ user: user });
      } else {
        that.setState({ user: null });
      }
    });
  }

  logoutCurrentUser () {
    let user = firebase.auth().currentUser;
    let that = this;
    user.delete().then(function() {
      that.checkCurrentUser();
    }, function(error) {
      console.log("logout error", error);
    });
  }

  render () {
    let splashNode;
    let user = firebase.auth().currentUser;
    if (user) {
      if (user.isAnonymous) {
        splashNode = (
          <SplashProfileAnon
            user={user}
            logoutCurrentUser={this.logoutCurrentUser} />
        )
      } else {
        splashNode = (
          <SplashProfile
            user={user}
            logoutCurrentUser={this.logoutCurrentUser} />
        )
      }
    } else {
      splashNode = (
        <div>
          <div className="top">
            login or sign up to play online
          </div>
          <FacebookLogin checkCurrentUser={this.checkCurrentUser} />
          <GoogleLogin checkCurrentUser={this.checkCurrentUser} />
          <AnonymousLogin checkCurrentUser={this.checkCurrentUser} />
        </div>
      )
    }

    return (
      <div className="start-splash-container">
        {splashNode}
      </div>
    );
  }
}
