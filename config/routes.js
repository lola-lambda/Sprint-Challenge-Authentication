const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../_secrets/keys');
const { authenticate } = require('./middlewares');
const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const secret = jwtKey
  const options = {
    expiresIn: '1h'
  }
  return jwt.sign(payload, secret, options)
}

function register(req, res) {
  const creds = req.body
  creds.password = bcrypt.hashSync(creds.password, 5)
  db('users')
    .insert(creds)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err))
}

function login(req, res) {
  const creds = req.body
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user)
        res.status(200).json(token)
      } else {
        res.status(401).json({ error: 'login failed' })
      }
    })
    .catch(err => res.status(500).json({ message: ":(", err }))
}

function getJokes(req, res) {
  axios
    .get('https://safe-falls-22549.herokuapp.com/random_ten')
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json({ message: 'Error Fetching Jokes', error: err }))
}
