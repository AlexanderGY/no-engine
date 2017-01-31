const express = require('express'),
   expressSession = require('express-session'),
   path = require('path'),
   favicon = require('serve-favicon'),
   logger = require('morgan'),
   cookieParser = require('cookie-parser'),
   bodyParser = require('body-parser'),
   mongoose = require('mongoose'),
   routes = require('./routes/index'),
   app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressSession({
  secret: 'Omg'
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(function(req, res, next) {
  res.locals.current = req.session.current;
  next();
});

app.use('/', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
