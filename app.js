var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser'); //requiriendo el bodyParse previamente instalado con este comando npm install body-parser -g en consola para procesar el formulario de crear libro

//Rutas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var librosRouter = require('./routes/libros'); //ruta nueva creada para lista de libros y otras sub-paginas

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended:false })); //usando el bodyParse para procesar el formulario de crear libro
app.use(bodyParser.json()); // esto es haciendo que el bodyParse sea compatible y devuelva información en formato Json

//Dando uso a las rutas creadas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/libros', librosRouter);

// catch 404 and forward to error handler
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
