import React from 'react';

class StartSplash extends React.Component {
  constructor () {
    super();
  }

  linkTo (address) {
    this.context.router.push(address);
  }

  render () {
    return (
    <div className="start-splash-container">
      <div className="auth-option">
        play online
      </div>
      <div className="auth-option"
           onClick={() => this.linkTo("two_player_game")}>
        multiplayer local
      </div>
      <div className="start-option-soon">
        play an AI
      </div>
    </div>
    );
  }
}

StartSplash.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default StartSplash;
