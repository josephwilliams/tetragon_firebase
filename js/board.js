import Player from './player';
import GridShapes from './grid_shapes';

export default class Board {
  constructor () {
    this.grid = [];
    this.player1 = new Player('player 1', 1, 'Red');
    this.player2 = new Player('player 2', 2, 'Blue');
    this.currentPlayer = this.player1;
    this.currentMove = 1;
    this.firstSelect = null;
    this.gameState = true;
    this.gameBegun = false;
    this.winner = null;
    this.message = "Begin! Red moves first.";
    this.redCount = 2;
    this.blueCount = 2;
    this.deltas = [[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,1],[-1,-1]];
    this.moveDeltas = [[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,1],[-1,-1],
                       [-1,2],[0,2],[1,2],[2,2],[2,-1],[2,0],[2,1],[1,2],[-2,1],
                       [-2,-2],[-2,-1],[-2,0],[-1,-2],[0,-2],[1,-2],[2,-2],[-2,2]];
    this.recentlyAssessed = [];
    this.populateGrid();
  }

  populateGrid () {
    // randomly selects number between 1-3
    var gridKey = Math.floor(Math.random() * (4 - 1)) + 1;
    let randGrid = GridShapes[gridKey];
    // creates shallow dup of the GridShapes grid for use as this.grid
    let clonedGrid = randGrid.map(arr => arr.slice());
    this.grid = clonedGrid;
  }

  persistGame () {
    this.scoreboard();
    this.switchPlayers();
    if (!this.anyAvailableMove()){
      this.fillRestofBoard();
      this.scoreboard();
      this.endGame();
    }
  }

  anyAvailableMove () {
    var nonCurrentNum = this.currentPlayer === this.player1 ? 2 : 1;
    var currentNum = this.currentPlayer.num;
    var liveTiles = 0;
    this.grid.forEach((arr, idx1) => {
      arr.forEach((tile, idx2) => {
        var gridTile = this.grid[idx1][idx2];
        if (gridTile === currentNum) {
          var availableMove = false;
          this.moveDeltas.forEach(delta => {
            let y = delta[0] + idx1;
            let x = delta[1] + idx2;
            if (this.grid[y] !== undefined && this.grid[y][x] === false ||
                this.grid[y] !== undefined && this.grid[y][x] === true){
              availableMove = true;
            }
          });
          if (availableMove){
            liveTiles++;
          }
        }
      });
    });

    let anyAvailable = liveTiles > 0 ? true : false;
    return anyAvailable;
  }

  fillRestofBoard () {
    var nonCurrentNum = this.currentPlayer === this.player1 ? 2 : 1;
    this.grid.map((arr, idx1) => {
      arr.map((tile, idx2) => {
        var gridTile = this.grid[idx1][idx2];
        if (this.grid[idx1][idx2] === false)
          this.grid[idx1][idx2] = nonCurrentNum;
      });
    });
  }

  // #considerMove considers this.currentMove (1 or 2);
  // if #goodfirstSelect calls #updateGridFirstSelect;
  // if #goodSecondSelect via #logicalSecondSelect
  // calls #updateGridSecondSelect; #resolveBoard; then #switchPlayers;
  // this.gameState determined by #isOver;
  // #endGame otherwise;
  considerFirstMove (coords) {
    if (this.currentMove === 1){
      if (this.goodFirstSelect(coords)){
        this.message = "good selection.";
        this.currentMove = 2;
        return this.updateGridFirstSelect(coords);
      } else {
        this.message = "invalid selection.";
        return this.restartTurn();
      }
    }
  }

  considerSecondMove (coords) {
    this.resolveBoard();
    if (this.currentMove === 2) {
      var selectionData = this.goodSecondSelect(coords);
      // [0] will be true/false; [1] will be "jump"/"slide"
      if (selectionData[0]){
        this.message = "valid move!";

        var nextPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
        if (selectionData[1] === "jump"){
          this.message = "jump! " + "   " + nextPlayer.color + "'s turn.";
          this.currentMove = 1;
          return this.updateGridSecondSelectJump(coords);
        } else if (selectionData[1] === "slide"){
          this.message = "slide!" + "   " + nextPlayer.color + "'s turn.";
          this.currentMove = 1;
          return this.updateGridSecondSelectSlide(coords);
        }
      } else {
        this.message = "invalid selection.";
        return this.restartTurn();
      }
    }
  }

  goodFirstSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    if (this.currentPlayer === this.player1){
      if (this.grid[y][x] !== 1) {
        return false;
      }
    } else if (this.currentPlayer === this.player2){
      if (this.grid[y][x] !== 2) {
        return false;
      }
    }

    this.firstSelect = [y, x];
    return true;
  }

  goodSecondSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    if(this.grid[y][x] !== false)
      return false;

    var selectionData = this.logicalSecondSelect(coords);
    if (selectionData[0]){
      if (selectionData[1] === "jump"){
        return [true, "jump"];
      } else if (selectionData[1] === "slide"){
        return [true, "slide"];
      }
    } else {
      return false;
    }
  }

  logicalSecondSelect (coords) {
    var y1 = this.firstSelect[0];
    var x1 = this.firstSelect[1];
    var y2 = coords[0];
    var x2 = coords[1];

    if (this.between(x1, (x2 + 1), (x2 - 1)) && this.between(y1, (y2 + 1), (y2 - 1))) {
      return [true, "slide"];
    } else if (this.between(x1, (x2 + 2), (x2 - 2)) && this.between(y1, (y2 + 2), (y2 - 2))) {
      return [true, "jump"];
    } else {
      return false;
    }
  }

  between(a, x, y) {
    return a <= x && a >= y;
  }

  updateGridFirstSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    this.recentlyAssessed = [];

    // make available spots glow;
    this.moveDeltas.forEach(delta => {
      let tempX = delta[1] + x;
      let tempY = delta[0] + y;

      if (this.grid[tempY] == null || this.grid[tempY][tempX] == null) {
        return;
      } else if (this.grid[tempY][tempX] === false) {
        this.grid[tempY][tempX] = true;
        this.recentlyAssessed.push([tempY, tempX]);
      }
    });
  }

  resolveBoard () {
    this.grid.forEach((arr, y) => {
      arr.map((tile, x) => {
        if (this.grid[y][x] === true){
          this.grid[y][x] = false;
        }
      });
    });
  }

  updateGridSecondSelectJump (coords) {
    var x = coords[1];
    var y = coords[0];
    this.grid[y][x] = this.currentPlayer.num;

    var x1 = this.firstSelect[1];
    var y1 = this.firstSelect[0];
    this.grid[y1][x1] = false;

    this.assessOffensiveMove(coords);
    this.persistGame();
  }

  updateGridSecondSelectSlide (coords) {
    var x = coords[1];
    var y = coords[0];

    this.grid[y][x] = this.currentPlayer.num;
    this.assessOffensiveMove(coords);
    this.persistGame();
  }

  assessOffensiveMove (coords) {
    // game begins when first good move is made
    // 'randomize' feature disappears
    this.gameBegun = true;

    var x = coords[1];
    var y = coords[0];

    // change gem colors / offensive move
    this.deltas.forEach(delta => {
      let tempX = delta[1] + x;
      let tempY = delta[0] + y;
      var otherPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
      if (this.grid[tempY] == null) {
        return;
      } else if (this.grid[tempY][tempX] === otherPlayer.num) {
        this.grid[tempY][tempX] = this.currentPlayer.num;
      }
    });
  }

  restartTurn () {
    this.firstSelect = null;
    this.currentMove = 1;
    let color = this.currentPlayer.color;
    this.message = "Invalid. Restart " + color + ".";
  }

  switchPlayers () {
    this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
  }

  isOver() {
    var flattened = this.grid.reduce((a, b) => a.concat(b));

    for (var i = 0; i < flattened.length; i++) {
      if (flattened[i] === false)
        return false;
    }

    return true;
  }

  endGame () {
    this.switchPlayers();
    this.winner = this.currentPlayer;
    this.message = "game over! " + this.winner.color + " wins!";
    this.gameState = false;
  }

  scoreboard () {
    var flattened = this.grid.reduce((a, b) => a.concat(b));
    var blueCount = 0;
    var redCount = 0;
    for (var i = 0; i < flattened.length; i++) {
      if (flattened[i] === 1){
        redCount ++;
      } else if (flattened[i] === 2){
        blueCount ++;
      }
    }

    this.redCount = redCount;
    this.blueCount = blueCount;
  }
}
