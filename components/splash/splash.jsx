import React from 'react';
import StartSplash from './start_splash';
import AuthSplash from './auth_splash';

var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class Splash extends React.Component {
  constructor () {
    super();
  }

  // componentWillMount () {
  //   // Initialize Firebase
  //   var config = {
  //     apiKey: "AIzaSyCyutMsgN0n5ErnDaX9mgvoQtWEiqXix9Y",
  //     authDomain: "tetragon-3e324.firebaseapp.com",
  //     databaseURL: "https://tetragon-3e324.firebaseio.com",
  //     storageBucket: "",
  //   };
  //
  //   // console.log("firebase", firebase);
  //   firebase.initializeApp(config);
  // }

  render () {
    return (
      <div className="splash-container">
        <div className="top">
          <div className="header-container">
            <h1>TETRAGON</h1>
          </div>
        </div>
        <div className="bottom">
          <StartSplash />
          <AuthSplash />
        </div>
      </div>
    );
  }
}
