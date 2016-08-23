import React from 'react';

export default class SplashProfile extends React.Component {
  constructor (props) {
    super(props);
  }

  showUsername () {
    return (
      <p>
        {this.props.user.displayName}
      </p>
    )
  }

  showImage () {
    let imgUrl = this.props.user.photoURL;
    return (
      <img src={imgUrl}
           style={{width:"60px", marginBottom:"10px"}}>
      </img>
    );
  }

  render () {
    console.log(this.props.user);
    return (
      <div className="user-profile">
        {this.showImage()}
        {this.showUsername()}
        <div className="logout-user"
           onClick={() => this.props.logoutCurrentUser()}>
           <h5>logout</h5>
        </div>
      </div>
    );
  }
}
