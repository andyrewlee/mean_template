var express = require('express.io');
var path = require('path');
var app = express().http().io();
var config = require('./config/mongoose');

app.configure(function(){
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.bodyParser()); //to allow handling of POST data
  app.use(express.cookieParser()); //to allow session handling
  app.use(express.session({secret: 'monkey'})); //for using sessions
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var server = app.listen(3000);
var route = require('./config/routes.js')(app);
console.log("Express server listening on port 3000");
