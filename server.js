import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import loggerfrom from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from './core/logger/app.logger';
import config from './core/config/config.dev';
import connectToDb from './db/connect';
import asset from './routes/asset.router.js';
import device from './routes/device.router.js';
import usertype from './routes/usertype.router.js';


import cors from 'cors';

const port = config.serverPort;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

connectToDb();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(loggerfrom('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/users', users);
// 
app.use(cors())

app.use(function(req, res, next) {
 res.header('Access-Control-Allow-Origin', "*");
 res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
next();
})

app.use(device);
app.use(asset);
app.use(usertype);


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

app.listen(port, () => {
    logger.info('server started - ', port);
});

module.exports = app;
