// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

//Adding files for authentication
var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan'); //Logger middleware

// configuration ===========================================

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// config files
var db = require('./app/config/db');

require('./app/config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

app.use(morgan('dev')); //Log all http request to console.
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','jade');


app.use(session({ secret : 'ilovescotchmeantutorialsscotchmeantutorials'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes
require('./app/rest')(app);

app.set('views', __dirname + '/public/views');
app.use(express.static(__dirname + '/public'));

// start app ===============================================
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app