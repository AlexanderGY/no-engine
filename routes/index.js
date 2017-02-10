'use strict';
let express = require('express');
let router = express.Router();
let isPostRegExp = /\w+/g;
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

/**
 * TODO class to external file
 */
const userSchema = new mongoose.Schema({
  login: String,
  password: String
});

const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  link: String
});

let Post = mongoose.model('post', postSchema);
let User = mongoose.model('user', userSchema);

mongoose.connect('mongodb://localhost/test');
/**
 * TODO to api.js
 */
router
  .get('/', function(req, res, next) {
    res.render('index', { title: 'Main' });
  })
  .post('/api/exit/', function(req, res, next) {
    if (req.session.current.login) {
      delete req.session.current.login;
      res.status(200).send({error: false, description: 'User log out success'});
    }
  })
  .get(isPostRegExp, function(req, res, next) {
    Post.find({link: req.path.replace(/\//g,'')}, function(err, article) {
      if (article.length) {
        res.render('post', {title: article[0].title, text: article[0].text});
      } else {
        res.status(404).render('error', { title: 'Page not found', message: 'Page not found', error: {status: '404'} });
      }
    });
  })
  .post('/api/items/get_items/', function(req, res, next) {
    Post.find({}, function(err, posts) {
      if (!err) {
        res.status(200).send(posts);
      }
    });
  })
  .post('/api/config/get_settings/', function(req, res, next) {
    if(req.session.current.login) {
      res.status(200).send({isLogined: true, login: req.session.current.login});
    } else {
      res.status(200).send({isLogined: false});
    }
  })
  .post('/api/registration/', function(req, res, next) {
    let user = User(req.body);
    user.save(function(err) {
      if (!err) {
        req.session.current = {
          login: req.body.login
        };
        res.status(200).send({error: false, description: 'User saved'});
      } else {
        res.status(200).send({error: true});
      }
    });
  })
  .post('/publish/', function(req, res, next) {
    let article = Post({
      title: req.body.title,
      text: req.body.text,
      link: req.body.title.toLowerCase().replace(/[^\w]/gi, '-')
    });
    article.save(function(err) {
      if (!err) {
        res.status(200).send({error: false, description: 'Article saved'});
      } else {
        res.status(200).send({error: true});
      }
    });
  })
  .post('/api/login/', function(req, res, next) {
    User.find({login: req.body.login}, function(err, user) {
      if (user.length && user[0].password == req.body.password) {
        req.session.current = {
          login: user[0].login
        };
        res.status(200).send({error: false, description: 'User found. Password and username correct'});
      } else {
        res.status(200).send({error: true, description: 'Username or password incorrect'});
      }
    });
  });

module.exports = router;
