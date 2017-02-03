'use strict';
let express = require('express'),
    router = express.Router(),
    isPostRegExp = /\w+/g,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

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
  .get('/login/', function(req, res, next) {
    res.render('login', { title: 'Login' });
  })
  .get('/publish/', function(req, res, next) {
    if (req.session.current.login) {
      res.render('publish', { title: 'Publish' });
    } else {
      res.redirect('/login/');
    }
  })
  .get('/exit/', function(req, res, next) {
    if (req.session.current.login) {
      delete req.session.current.login;
      res.redirect('/');
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
  .post('/', function(req, res, next) {
    Post.find({}, function(err, posts) {
      res.status(200).send(posts);
    });
  })
  .post('/api/config/get_settings/', function(req, res, next) {
    if(req.session.current.login) {
      res.status(200).send({isLogined: true, login: req.session.current.login});
    } else {
      res.status(200).send({isLogined: false})
    }
  })
  .post('/registration/', function(req, res, next) {
    let user = User(req.body);
    user.save(function(err) {
      res.redirect('/');
    });
  })
  .post('/publish/', function(req, res, next) {
    let article = Post({
      title: req.body.title,
      text: req.body.text,
      link: req.body.title.toLowerCase().replace(/[^\w]/gi, '-')
    });
    article.save(function(err) {
      res.redirect('/');
    });
  })
  .post('/login/', function(req, res, next) {
    User.find({login: req.body.login}, function(err, user) {
      if (user.length) {
        if (user[0].password == req.body.password) {
          req.session.current = {
            login: user[0].login
          };
          res.redirect('/');
        }
      } else {
        res.render('login', { title: 'Login', error: 'Login or password doesn`t exist' });
      }
    });
  });

module.exports = router;
