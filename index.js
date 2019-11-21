const express = require('express');
const app = express();
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
//provides a way of working with directories and file paths
var path = require('path');
var mysql= require('mysql');
//logging tool 
var logger = require('morgan');
//
//var bodyParser= require('body-parser');

var config = require('./config')
//A request for a resource
var cors = require('cors');

app.use(cors());
app.get('/',(req,res)=>{
    res.send("yul");
  });
  
app.listen(3001);

var indexRouter = require('./routes/index');
var GetEmployeeList = require('./routes/GetEmployeeList');
var GetEmployeeRoles = require('./routes/GetEmployeeRoles');
var ClockIn  = require('./routes/ClockIn');
var myConnection  = require('express-myconnection');

var dbOptions = {
    host:	  config.database.host,
    user: 	  config.database.user,
    password: config.database.password,
    port: 	  config.database.port, 
    database: config.database.db
}
  
app.use(myConnection(mysql, dbOptions, 'pool'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/GetEmployeeList', GetEmployeeList);
app.use('/GetEmployeeRoles', GetEmployeeRoles);
app.use('/ClockIn', ClockIn);

app.use(function(req, res, next) {
    next(createError(404));
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
