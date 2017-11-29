// import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/search_bar';
import LoginForm from './components/login_form';
//import Profile from './components/profile';

class App extends Component {
  constructor(props) {
    super(props);

  this.state = {jokes: [],
                showForm: false,
                users: []};
}

getJokes(){
  axios.get('https://icanhazdadjoke.com/search?limit=20', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    let jokes = res.data.results;
    // console.log(jokes);
    this.setState({ jokes });
  })
}

searchJokes(term){
  axios.get(`https://icanhazdadjoke.com/search?term=${term}`, {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    let jokes = res.data.results;
    this.setState({ jokes });
  })
}

componentDidMount() {
  this.getJokes();
  axios.get('/users')
      .then(res => {
        let users = res.data;
        this.setState({ users })
      });
}

  render() {
    const { showForm } = this.state;

    // const searchJokes = _.debounce((term) => {this.searchJokes(term)}, 500)

    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">Joke Time</span>
          <SearchBar onSearchTermChange={term => this.searchJokes(term)} />
          <i className="material-icons" onClick={() => this.setState({ showForm: !showForm })}>face</i>
        </header>
        { showForm ? <LoginForm showForm={this.state.showForm} /> : null }
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <div>
          {this.state.jokes.map(joke =>
          <div className="joke-card" key={joke.id}>{joke.joke} <i className="material-icons">favorite_border</i></div>
        )}
        </div>
      </div>
    );
  }
}

export default App;
