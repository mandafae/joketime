import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: currentUser
    }
  }

  componentDidMount() {
    axios.get(`/users/${currentUser.id}`)
    .then(res => {
      console.log(res);
    })
  }

  render() {
    return(
      console.log(currentUser)
    )
  }

}

export default Profile;
