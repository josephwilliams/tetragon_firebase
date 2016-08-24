import React from 'react';
import Board from '../../js/board';
import BoardComponent from './board_comp';

// firebase app and database
import Firebase from 'firebase';
// var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

// const ref = new Firebase('https://<APPNAME>.firebaseio.com/games');

class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      board: new Board
    };
    this.updateBoard = this.updateBoard.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount () {
    // listen for change to board from database; if so, update board in state
    let gameRef = firebase.database().ref('games/' + gameId + '/board');
    this.bindAsArray(boardRef, 'board');

    // gameRef.on('value', function(snapshot) {
    //   console.log("snapshot", snapshot);
    //   let updatedBoard = snapshot.val();
    //   this.setState({ board: updatedBoard });
    // });
  }

  updateBoard (coords) {
    var board = this.state.board;
    var y = coords[0];
    var x = coords[1];

    board.scoreboard();
    if (board.currentMove === 1){
      board.considerFirstMove(coords);
      this.setState({ board: board });
    } else if (board.currentMove === 2){
      board.considerSecondMove(coords);
      this.setState({ board: board });
    }

    this.setState({ board: board });
  }

  restart () {
    this.setState({ board: new Board });
  }

  render () {
    return (
      <div className="game-container">
        <BoardComponent
          board={this.state.board}
          updateBoard={this.updateBoard}
          restart={this.restart}
        />
      </div>
    )
  }
}

reactMixin(Game.prototype, ReactFireMixin)

export default Game;
