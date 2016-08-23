import React from 'react';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class AnonymousLogin extends React.Component {
  constructor () {
    super();
  }

  anonymousSignIn () {
    firebase.auth().signInAnonymously().catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error", errorMessage);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        console.log("anonymous user signed in", user);
      } else {
        // User is signed out.
        console.log("anonymous user signed out");
      }
    });

    this.props.checkCurrentUser();
  }

  render () {
    return (
      <div className="auth-option"
           onClick={() => this.anonymousSignIn()}>
        play anonymously
      </div>
    );
  }
}
