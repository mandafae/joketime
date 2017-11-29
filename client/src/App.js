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
                userid: 1};
}

getJokes(){
  axios.get('https://icanhazdadjoke.com/search?limit=20', {
    headers: {
      'Accept': 'application/json'
    }
  }).then(res => {
    let jokes = res.data.results;
    console.log(jokes);
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

addFavorite(joke) {
  console.log(joke);
  axios.patch(`/users/${this.state.userid}`)
  .then(res => {
    console.log(res)
  })
}

toggleForm = (showing) => {
  this.setState({ showForm: !this.state.showForm })
}

componentDidMount() {
  this.getJokes();
}

  render() {
    const { showForm } = this.state;

    // const searchJokes = _.debounce((term) => {this.searchJokes(term)}, 500)

    return (
      <div className="App">
        <header className="App-header">
          <span className="App-title">Joke Time</span>
          <SearchBar onSearchTermChange={term => this.searchJokes(term)} />
          <i className="material-icons" onClick={this.toggleForm}>face</i>
        </header>
        { showForm ? <LoginForm callbackFromParent={this.toggleForm} /> : null }
        <div>
          {this.state.jokes.map(joke =>
          <div className="joke-card" key={joke.id}>{joke.joke} <i className="material-icons" onClick={joke => this.addFavorite(joke)}>favorite_border</i></div>
        )}
        </div>
      </div>
    );
  }
}

export default App;
