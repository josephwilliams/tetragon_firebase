import React from 'react';

export default class ScoreBoard extends React.Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <div className="scoreboard-container">
        <div className="top">
          <div className="score-container">
            <div style={{textShadow: "rgb(255, 7, 7) 0px 0px 5px"}}>
              red: &nbsp;
            </div>
            {this.props.redCount}
          </div>
          <div className="score-container">
            <div style={{textShadow: "rgb(7, 226, 255) 0px 0px 5px"}}>
              blue: &nbsp;
            </div>
            {this.props.blueCount}
          </div>
        </div>
        <div className="bottom">
          {this.props.message}
        </div>
      </div>
    )
  }
}
