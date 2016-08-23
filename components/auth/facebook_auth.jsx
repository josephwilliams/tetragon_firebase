import React from 'react';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class FacebookLogin extends React.Component {
  constructor () {
    super();
  }

  facebookPopUpSignIn () {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });

    this.props.checkCurrentUser();
  }

  render () {
    return (
      <div className="auth-option"
           onClick={() => this.facebookPopUpSignIn()}>
        <div className="left">
          facebook
        </div>
        <div className="right">
          <img src="images/facebook-icon.png"></img>
        </div>
      </div>
    );
  }
}
