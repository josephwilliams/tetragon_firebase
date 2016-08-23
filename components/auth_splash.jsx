import React from 'react';

export default class AuthSplash extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
    <div className="start-splash-container">
      <div className="top">
        login or sign up to play online
      </div>
      <div className="auth-option">
        <div className="left">
          facebook
        </div>
        <div className="right">
          <img src="images/facebook-icon.png"
               style={{width:"45px"}}></img>
        </div>
      </div>
      <div className="auth-option">
        <div className="left">
          google
        </div>
        <div className="right">
          <img src="images/google-logo.png"
               style={{width:"50px"}}></img>
        </div>
      </div>
      <div className="auth-option">
        play anonymously
      </div>
    </div>
    );
  }
}
