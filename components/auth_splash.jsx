import React from 'react';
import AnonymousLogin from './auth/anon_auth';
import GoogleLogin from './auth/google_auth';
import FacebookLogin from './auth/facebook_auth';
import SplashProfile from './splash_profile';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class AuthSplash extends React.Component {
  constructor () {
    super();
    this.state = { user: null };
    this.checkCurrentUser = this.checkCurrentUser.bind(this);
  }

  componentWillMount () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCyutMsgN0n5ErnDaX9mgvoQtWEiqXix9Y",
      authDomain: "tetragon-3e324.firebaseapp.com",
      databaseURL: "https://tetragon-3e324.firebaseio.com",
      storageBucket: "",
    };

    // console.log("firebase", firebase);
    firebase.initializeApp(config);
  }

  componentDidMount () {
    this.checkCurrentUser();
  }

  checkCurrentUser () {
    let that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({ user: user });
        // User is signed in.
        console.log("user signed in", user);
      } else {
        // No user is signed in.
        console.log("no user signed in");
      }
    });
  }

  render () {
    let splashNode;
    let user = firebase.auth().currentUser;
    if (user) {
      console.log("user", user);
      splashNode = (
        <div>
          <SplashProfile user={user} />
        </div>
      );
    } else {
      console.log("no user!");
      splashNode = (
        <div>
          <div className="top">
            login or sign up to play online
          </div>
          <FacebookLogin />
          <GoogleLogin checkCurrentUser={this.checkCurrentUser} />
          <AnonymousLogin checkCurrentUser={this.checkCurrentUser} />
        </div>
      )
    }

    return (
      <div>
        {splashNode}
      </div>
    );
  }
}
