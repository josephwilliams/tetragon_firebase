import React from 'react';
import StartSplash from './start_splash';
import AuthSplash from './auth_splash';

export default class Splash extends React.Component {
  constructor () {
    super();
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
          <StartSplash />
          <AuthSplash />
        </div>
      </div>
    );
  }
}
