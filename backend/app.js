const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const request = require("superagent");

let access_token;

const app = express();

mongoose
  .connect(
    "mongodb+srv://hGjoka16:Hegi!997@cluster0-8glsa.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  next();
});

app.get('/repos/signin', (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    return res.send({
      message: 'We are sorry, but you aren\'t connected'
    });
  }
  request
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id: 'efaabbebfc9582091a2d',
      client_secret: '8e53a7263344ba96b4580a4dce742187e6410887',
      code: code
    })
    .set('Accept', 'application/json')
    .then((result) => {
      access_token = `token ${result.body.access_token}`;
      res.redirect('http://localhost:4200/repos');
    });
});

app.get('/repos', (req, res, next) => {
  const token = access_token || req.headers.authorization;
  if (token === '') {
    return res.status(401).json({
      status: 'NOT_AUTHENTICATED'
    });
  }
  request
    .get('https://api.github.com/user')
    .set('Authorization', token)
    .then((result) => {
      res.status(200).json({
        status: 'OK',
        token: token,
        data: result.body
      });
    });
});

app.get('/repos/:user', (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({
      status: 'NOT_AUTHENTICATED'
    });
  }
  request
    .get(`https://api.github.com/users/${req.params.user}/repos`)
    .set('Authorization', req.headers.authorization)
    .then((result) => {
      res.status(200).json({
        status: 'OK',
        data: result.body
      });
    });
});

app.get('/repos/:user/:repo', (req, res, next) => {
  if (req.headers.authorization === undefined) {
    return res.status(401).json({
      status: 'NOT_AUTHENTICATED'
    });
  }
  request
    .get(`https://api.github.com/repos/${req.params.user}/${req.params.repo}`)
    .set('Authorization', req.headers.authorization)
    .then((result) => {
      res.status(200).json({
        status: 'OK',
        data: result.body
      });
    });
});

app.get('/repos/:user/:repo/languages', (req, res, next) => {
  const user = req.params.user;
  const repo = req.params.repo;
  if (req.headers.authorization === undefined) {
    return res.status(401).json({
      status: 'NOT_AUTHENTICATED'
    });
  }
  request
    .get(`https://api.github.com/repos/${user}/${repo}/languages`)
    .set('Authorization', req.headers.authorization)
    .then((result) => {
      res.status(200).json({
        status: 'OK',
        data: result.body
      });
    });
});

module.exports = app;
