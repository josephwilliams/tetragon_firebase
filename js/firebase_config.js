import Board from './board';

// firebase app and database
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// CONSTANTS used within GameConfigs class
// The maximum number of players.  If there are already
// NUM_PLAYERS assigned, users won't be able to join the game.
const NUM_PLAYERS = 2;

// The root of your game data.
const GAME_LOCATION = 'https://tetragon-3e324.firebaseio.com/games';

// A location under GAME_LOCATION that will store the list of
// players who have joined the game (up to MAX_PLAYERS).
const PLAYERS_LOCATION = 'player_list';

// A location under GAME_LOCATION that you will use to store data
// for each player (their game state, etc.)
const PLAYER_DATA_LOCATION = 'player_data';

export default class GameConfigs {
  constructor (user, permitGameStart) {
    this.log = []; // list of happenings and IDs
    this.gameKey = null; // should be set on initialization of GameConfig class
    this.player = user;

    this.acknowledgeUser(user);
    this.checkOpenGame();
  }

  acknowledgeUser () {
    let user = this.player;
    let note1 = "Matchmaking has begun";
    let note2 = "Player Username: " + user.displayName;
    let note3 = "Player ID: " + user.uid;
    this.log.push(note1);
    this.log.push(note2);
    this.log.push(note3);
  }

  getNewGameKey () {
    // set up new game in '/games' in database
    const newGameKey = firebase.database().ref().child('games').push().key;
    this.gameKey = newGameKey;
    let newGame = "New game initialized";
    let newGameConfigs = "Game ID: " + newGameKey;
    this.log.push(newGame);
    this.log.push(newGameConfigs);
  }

  checkOpenGame () {
    var gamesList = firebase.database().ref('games');

    gamesList.on('value', function(snapshot) {
      // snapshot is object containing all game IDs
      let list = snapshot.val();
      for (let key in list) {
        let game = list[key];
        let playerList = game.player_list;
        if (playerList.length === 1) {
          // set current game to game key and call initiate matchmaking
          this.gameKey = key;
          let gameNote = "Found open game";
          let gameNote2 = "Open Game ID: " + this.gameKey;
          this.log.push(gameNote);
          this.log.push(gameNote2);
          return this.initiateMatchmaking();
        }
      }
    }.bind(this));


    this.getNewGameKey();
  }

  // re-base's synced state will likely render this method useless
  // updateBoard (board) {
  //   let postData = {
  //     players: null,
  //     board: board
  //   };
  //
  //   let updates = {};
  //   updates['/games/' + this.gameKey] = postData;
  //   return firebase.database().ref().update(updates);
  // }

  // Instantiate multiplayer game
  initiateMatchmaking () {
    var userId = this.player.uid;
    var gameRef = firebase.database().ref('games/' + this.gameKey);
    console.log("game reference:", gameRef);
    this.assignPlayerNumberAndPlayGame(userId, gameRef);
  }

  // Called after player assignment completes.
  playGame (myPlayerNumber, userId, justJoinedGame, gameRef) {
    console.log("playGame called");
    var playerDataRef = gameRef.child(PLAYER_DATA_LOCATION).child(myPlayerNumber);
      permitGameStart();
    if (justJoinedGame) {
      // alert('Doing first-time initialization of data.');
      playerDataRef.set({userId: userId, state: 'game state'});
      permitGameStart();
    }
  }

  // Use transaction() to assign a player number, then call playGame().
  assignPlayerNumberAndPlayGame (userId, gameRef) {
    var playerListRef = gameRef.child(PLAYERS_LOCATION);
    var myPlayerNumber, alreadyInGame = false;

    playerListRef.transaction(function(playerList) {
      // Attempt to (re)join the given game. Notes:
      //
      // 1. Upon very first call, playerList will likely appear null (even if the
      // list isn't empty), since Firebase runs the update function optimistically
      // before it receives any data.
      // 2. The list is assumed not to have any gaps (once a player joins, they
      // don't leave).
      // 3. Our update function sets some external variables but doesn't act on
      // them until the completion callback, since the update function may be
      // called multiple times with different data.
      if (playerList === null) {
        playerList = [];
      }

      for (var i = 0; i < playerList.length; i++) {
        if (playerList[i] === userId) {
          // Already seated so abort transaction to not unnecessarily update playerList.
          alreadyInGame = true;
          myPlayerNumber = i; // Tell completion callback which seat we have.
          return;
        }
      }

      if (i < NUM_PLAYERS) {
        // Empty seat is available so grab it and attempt to commit modified playerList.
        playerList[i] = userId;  // Reserve our seat.
        myPlayerNumber = i; // Tell completion callback which seat we reserved.
        return playerList;
      }

      // Abort transaction and tell completion callback we failed to join.
      myPlayerNumber = null;
    }, function (error, committed) {
      // Transaction has completed.  Check if it succeeded or we were already in
      // the game and so it was aborted.
      if (committed || alreadyInGame) {
        console.log("Successful join.", myPlayerNumber, userId, gameRef);
        this.playGame(myPlayerNumber, userId, !alreadyInGame, gameRef);
      } else {
        console.log("Can't join game.");
      }
    }.bind(this));
  }
}
