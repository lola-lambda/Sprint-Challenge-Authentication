import React, { Component } from 'react';
import { EventEmitter } from '../events';

class Register extends Component {
  constructor(props) {
    super(props);
      this.state = {
        username: '',
        password: ''
      };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitHandler = event => {
    event.preventDefault();
    const { username, password } = this.state;
    let newUser = { username, password }
    EventEmitter.dispatch('register', newUser);
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <div>Sign Up
        <form onSubmit={this.submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Register