import React from 'react';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');


export default class GoogleLogin extends React.Component {
  constructor () {
    super();
  }

  // componentWillMount () {
  //   var provider = new firebase.auth.GoogleAuthProvider();
  // }

  googlePopUpSignIn () {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render () {
    return (
      <div className="auth-option"
           onClick={() => this.googlePopUpSignIn()}>
        <div className="left">
          google
        </div>
        <div className="right">
          <img src="images/googly-1.png"></img>
        </div>
      </div>
    );
  }
}
