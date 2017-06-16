const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb://Jor_passport:630132@ds129442.mlab.com:29442/heroku_cvpmf4db');


const routes = require('./apiroutes/home');
const users = require('./apiroutes/users');

const app = express();

//Connecting to database
const db = mongoose.connection;
mongoose.connect('mongodb://localhost/passportapp');

//Checking connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Server Connected to DB...."+new Date());
});

// Handlebars Initialize
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session MiddleWare
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());


// Connect Flash
app.use(flash());

// Global Variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


//Routes for app
app.use('/', routes);
app.use('/users', users);


app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
