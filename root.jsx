import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import TwoPlayerGame from './components/game/game_comp';
import Splash from './components/splash/splash';

//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

//Firebase
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCyutMsgN0n5ErnDaX9mgvoQtWEiqXix9Y",
  authDomain: "tetragon-3e324.firebaseapp.com",
  databaseURL: "https://tetragon-3e324.firebaseio.com",
  storageBucket: "",
};

firebase.initializeApp(config);

var routes = (
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={Splash} />
      <Route path="splash" component={Splash} />
      <Route path="two_player_game" component={TwoPlayerGame} />
    </Route>
  </Router>
);

class App extends React.Component {
  render () {
    return (
      <div className="content">
        {this.props.children}
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  Modal.setAppElement(document.body);
  ReactDOM.render(routes, root)
});
