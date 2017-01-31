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

router
  .get('*', function(req, res, next) {
    if (!req.session.current) {
      req.session.current = new Object();
    }
    let currentRequestUrl = req.originalUrl;
    switch (currentRequestUrl) {
      case '/':
        Post.find({}, function(err, posts) {
          res.render('index', { title: 'Main', data: posts });
        });
        break;
      case '/login/':
        res.render('login', { title: 'Login' });
        break;
      case '/publish/':
        if (req.session.current.login) {
          res.render('publish', { title: 'Publish' });
        } else {
          res.redirect('/login/');
        }
        break;
      case '/exit/':
        if (req.session.current.login) {
          delete req.session.current.login;
          res.redirect('/');
        }
        break;
      default:
        if (req.path.match(isPostRegExp)) {
          Post.find({link: req.path.replace(/\//g,'')}, function(err, article) {
            if (article.length) {
              res.render('post', {title: article[0].title, text: article[0].text});
            } else {
              res.status(404).render('error', { title: 'Page not found', message: 'Page not found', error: {status: '404'} });
            }
          });
        }
    }
  })
  .post('*', function(req, res, next) {
    if (!req.session.current) {
      req.session.current = {};
    }
    let currentRequestUrl = req.originalUrl;
    switch (currentRequestUrl) {
      case '/registration/':
        let user = User(req.body);
        user.save(function(err) {
          res.redirect('/');
        });
        break;
      case '/publish/':
        let article = Post({
          title: req.body.title,
          text: req.body.text,
          link: req.body.title.toLowerCase().replace(/[^\w]/gi, '-')
        });
        article.save(function(err) {
          res.redirect('/');
        });
        break;
      case '/login/':
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
        break;
      default:
        res.status(403).send('Error');
    }
  });

module.exports = router;
