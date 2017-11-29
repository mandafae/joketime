import React, {Component} from 'react';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {username: '',
                  password: '',
                  showForm: props.showForm};
  }

  onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
      }

  login = (e) => {
        e.preventDefault();
        const { username, password } = this.state;

        axios.post('/users/login', { username, password })
          .then((result) => {
            console.log(result)
            this.setState({ showForm: !this.state.showForm })
            console.log(this.state);
          });
      }

    signup = (e) => {
          e.preventDefault();
          const { username, password } = this.state;

          axios.post('/users/signup', { username, password })
            .then((result) => {
              console.log(result)
            });
        }

  render() {
    return (
      <div>
        <form>
        <input placeholder="username" name="username" value={this.username} onChange={this.onChange} />
        <input placeholder="password" name="password" value={this.password} onChange={this.onChange} />
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        </form>
      </div>
    );
  }
};

  export default LoginForm;
