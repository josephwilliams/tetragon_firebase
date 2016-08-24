import React from 'react';
import Faker from 'Faker';
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export default class SplashProfile extends React.Component {
  constructor (props) {
    super(props);
  }

  anonUsername () {
    let key = this.props.user.uid.slice(0,4);
    return 'anon-' + key;
  }

  anonImage () {
    // let imgUrl = Faker.Image.abstractImage();
    return (
      <img src="images/default-user.png"
           style={{width:"60px",marginBottom:"10px"}}>
      </img>
    );
  }

  logout () {
    let user = firebase.auth().currentUser;
    let that = this;
    user.delete().then(function() {
      that.props.checkCurrentUser();
    }, function(error) {
      console.log("logout error", error);
    });
  }

  render () {
    return (
      <div className="start-splash-container">
        <div className="anon-profile">
          {this.anonImage()}
          <p>{this.anonUsername()}</p>
          <p>signed in anonymously</p>
          <div className="logout-user"
            onClick={() => this.logout()}>
            <h5>logout</h5>
          </div>
        </div>
      </div>
    );
  }
}
