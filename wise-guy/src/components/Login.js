import React, { Component } from 'react';
import { EventEmitter } from '../events';

class Login extends Component {
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

  submitHandler = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    let user = { username, password }
    EventEmitter.dispatch('login', user);
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <div className='form'>Login
        <form onSubmit={this.submitHandler}>
          <input
            placeholder='Username'
            className='input'
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.changeHandler}
          />
          <input
            placeholder='Password'
            className='input'
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

export default Login;