import React from 'react';

export default class StartSplash extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
    <div className="start-splash-container">
      <div className="auth-option">
        play online
      </div>
      <div className="auth-option">
        multiplayer local
      </div>
      <div className="start-option-soon">
        play an AI
      </div>
    </div>
    );
  }
}
