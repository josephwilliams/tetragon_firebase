import React from 'react';
import AnonymousLogin from './auth/anon_auth';
import GoogleLogin from './auth/google_auth';
import FacebookLogin from './auth/facebook_auth';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class AuthSplash extends React.Component {
  constructor () {
    super();
  }

  componentWillMount () {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyCyutMsgN0n5ErnDaX9mgvoQtWEiqXix9Y",
      authDomain: "tetragon-3e324.firebaseapp.com",
      databaseURL: "https://tetragon-3e324.firebaseio.com",
      storageBucket: "",
    };

    console.log("firebase", firebase);
    firebase.initializeApp(config);

    this.checkCurrentUser();
  }

  checkCurrentUser () {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("user signed in", user);
      } else {
        // No user is signed in.
        console.log("no user signed in");
      }
    });
  }

  render () {
    return (
    <div className="start-splash-container">
      <div className="top">
        login or sign up to play online
      </div>

      <FacebookLogin />
      <GoogleLogin />
      <AnonymousLogin />
    </div>
    );
  }
}
