import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './help_modal_style';
import Instructions from './instructions_comp';
import Tile from './tile_comp';
import Scoreboard from './scoreboard_comp';
import Footer from './footer_comp';
import HelperModal from './help_modal';

class Board extends React.Component {
  constructor (props) {
    super(props);
  }

  linkTo (address) {
    this.context.router.push(address);
  }

  showBoard () {
    const boardTiles = [];
    const grid = this.props.board.grid;

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        let tileState = grid[i][j];
        boardTiles.push(
          <Tile
            position={[i, j]}
            tileState={tileState}
            currentPlayer={this.props.board.currentPlayer}
            open={false}
            updateBoard={this.props.updateBoard}
            onClick={() => this.considerMove([i, j])}
            key={[i, j]}
          />
        )
      }
    }

    return boardTiles;
  }

  showCurrentPlayer () {
    let currentColor = this.props.board.currentPlayer.color;
    var textShadow = (currentColor === 'Red') ? "0px 0px 5px #ff0707" : "0px 0px 5px #07e2ff";
    return (
      <div style={{textShadow: textShadow}}>
        {this.props.board.currentPlayer.color}
      </div>
    )
  }

  render () {
    return (
      <div className="board-container">
        <div className="header-container">
          <h1>TETRAGON</h1>
        </div>
        <div className="current-player-container">
          <h5>
            {this.showCurrentPlayer()}
          </h5>
          <div className="return-home-container"
               onClick={() => this.linkTo('splash')}>
            <h5>
              home
            </h5>
          </div>
        </div>
        <Scoreboard redCount={this.props.board.redCount}
                    blueCount={this.props.board.blueCount}
                    message={this.props.board.message}
                    currentPlayer={this.props.board.currentPlayer}
        />
        <HelperModal />
        <div className="tiles-container">
          {this.showBoard()}
        </div>
        <Footer
          gameState={this.props.board.gameState}
          gameBegun={this.props.board.gameBegun}
          restart={this.props.restart}
        />
      </div>
    )
  }
}

Board.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Board;
