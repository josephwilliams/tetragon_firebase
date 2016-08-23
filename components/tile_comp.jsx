import React from 'react';

export default class Tile extends React.Component {
  constructor (props) {
    super(props);
    this.updateBoard = props.updateBoard;
  }

  handleClick () {
    this.updateBoard(this.props.position);
  }

  render () {
    var tileState;
    var gemClass;
    if (this.props.tileState === null){
      tileState = 'null-tile';
      gemClass = "no-gem";
    } else if (this.props.tileState === false){
      tileState = 'open-tile';
      gemClass = "no-gem";
    } else if (this.props.tileState === true){
      tileState = "glow-tile";
      gemClass = "no-gem";
    }

    // different classes based on this.props.currentPlayer
    if (this.props.currentPlayer.num === 1){
      if (this.props.tileState === 1){
        tileState = "red-tile"; // player1 is red
        gemClass = "gem-red";
      } else if (this.props.tileState === 2){
        tileState = "blue-tile"; // player2 is blue
        gemClass = "gem-blue-inactive";
      }
    } else if (this.props.currentPlayer.num === 2) {
      if (this.props.tileState === 1){
        tileState = "red-tile"; // player1 is red
        gemClass = "gem-red-inactive";
      } else if (this.props.tileState === 2){
        tileState = "blue-tile"; // player2 is blue
        gemClass = "gem-blue";
      }
    }

    return(
      <div className="tile-container"
           onClick={() => this.handleClick()}>
        <div className={tileState}>
          <div className={gemClass}>
            <div className="shadow"></div>
          </div>
        </div>
      </div>
    )
  }
}
