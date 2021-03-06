var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');
var multer  = require('multer');
var lib = require('./lib/index.js');
var app = express();

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,//cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},//7 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));

app.use(multer({
  dest: './public/images',
  rename: function (fieldname, filename) {
    var newname = lib.randomData(10);
    return newname;
  }
}));
//模块实现了将会化信息存储到mongoldb中。secret 用来防止篡改 cookie，
//key 的值为 cookie 的名字，通过设置 cookie 的 maxAge 值设定 cookie 的生存期，
//这里我们设置 cookie 的生存期为 30 天，设置它的 store 参数为 MongoStore 实例，
//把会话信息存储到数据库中，以避免丢失。
//在后面，我们可以通过 req.session 获取当前用户的会话对象，获取用户的相关信息。


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
routes(app);
module.exports = app;
