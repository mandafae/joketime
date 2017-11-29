// require('dotenv').load();
const PORT = process.env.PORT || 8000;
const express = require('express');
const app = express();
const morgan = require('morgan');
const methodOverride = require('express-method-override');
const bodyParser = require('body-parser');
const session = require('cookie-session');
const cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set up cookies
const secret1 = process.env.SECRET_KEY1;
const secret2 = process.env.SECRET_KEY2;
app.use(cookieParser());
app.use(session({
  name: 'session',
  keys: [secret1,secret2],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// middleware
const isLoggedIn = (req,res,next) => {
  let user = req.session.user;
  console.log('sessions user:',user);
  if (user) {
    res.locals.currentUser = user; // make currentUser available to all of our views
    next();
  } else {
    res.locals.currentUser = null
    next();
  }
}

// check if user is logged in for every route
app.use(isLoggedIn)

//set up morgan
app.use(morgan('dev'));

//bring in other routes
const users = require('./routes/users');
app.use('/users', users);

//port listening
app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
