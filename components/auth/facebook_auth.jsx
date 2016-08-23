import React from 'react';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class FacebookLogin extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="auth-option">
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
