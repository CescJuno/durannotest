var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
*/
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var session = require('express-session');
/*
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var client = redis.createClient();
*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    key: 'sid', // 세션키
    secret: 'secret', // 비밀키
    cookie: {
        maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    },
    saveUninitialized: true, // don't create session until something stored,
    resave: false // don't save session if unmodified
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);


/*
app.use(session(
    {
        secret: 'secret_key',
        store: new redisStore({
            //host: "116.127.122.43",
            host: "localhost",
            port: 6379,
            client: client,
            prefix : "session:",
            db : 0
        }),
        saveUninitialized: true, // don't create session until something stored,
        resave: false // don't save session if unmodified
    }
));
*/


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;