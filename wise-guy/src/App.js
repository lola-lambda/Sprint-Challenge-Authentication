import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Register from './components/Register.js';
import Login from './components/Login.js';
import Jokes from './components/Jokes.js';
import { EventEmitter } from './events';
axios.defaults.withCredentials = true 

class App extends Component {
  constructor(props) {
    super(props)
    this.url = 'http://localhost:3300'
    this.state = {
      loggedIn: false,
      jokes: []
    }
    EventEmitter.subscribe('register', (newUser) => this.register(newUser))
    EventEmitter.subscribe('login', (user) => this.login(user))
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticate = () => {
    const token = localStorage.getItem('token');
    const options = {
      headers: {
        authorization: token,
      },
    };

    if (token) {
      axios.get(`${this.url}/api/jokes`, options)
        .then((res) => {
          console.log(res.data)
          res.data ? this.setState({ loggedIn: true, jokes: res.data }) : new Error()
        })
        .catch((err) => {
          console.log(err)
        });
    }
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if (pathname === '/' && pathname !== prevProps.location.pathname) {
      this.authenticate();
    }
  }

  register = newUser => {
    axios.post(`${this.url}/api/register`, newUser)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data)
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }
  
  login = user => {
    axios.post(`${this.url}/api/login`, user)
      .then((res) => {
        console.log(res.status)
        console.log(res.data)
        if (res.status === 200) {
          console.log(res.data)
          localStorage.setItem('token', res.data);
          this.props.history.push('/');
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ loggedIn: false })
  }

  render() {
    return (
      <div className='App'>
        <nav>
          <NavLink exact to='/'>Home</NavLink>
          <NavLink to='/register'>Register</NavLink>
          { this.state.loggedIn ? <div onClick={this.logout}>Logout</div> : <NavLink to='/login'>Login</NavLink> }
        </nav>
        <section className='main-container'>
          <Switch>
            <Route exact path='/' render={(props) => this.state.loggedIn ? <Jokes {...props} jokes={this.state.jokes}/> : <div>Please login to view jokes.</div>}/>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </section>
      </div>
    )
  }
}

export default withRouter(App);
