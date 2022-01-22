var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cookie = function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    // var randomNumber=Math.random().toString();
    // randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('username',"jordan", { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
};


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

var app = express();
var mongoose 		= require("mongoose");

const uri = "mongodb+srv://admin:Vj7uPoxy1gwxMMzO@cluster0.o9qgt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(" Mongoose is connected")
);

console.log(Food);

var Food 			= require("./models/food"),
    Collection = require('./models/collection'),
    Pantry 			= require("./models/pantry"),
    Shoppinglist 			= require("./models/shoppinglist"),
    User	= require("./models/user"),
    Recipe 			= require("./models/recipe");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/user', userRouter);



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

// app.get('/', (req, res)=>{
//   res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
// });

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});

module.exports = app;
