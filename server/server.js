﻿require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var nodemailer = require('nodemailer');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//var mongoose = require( 'mongoose' ); 


// var config = 'mongodb://localhost:27017/madhavi'; 
 
 // Create the database connection 
 //mongoose.connect(config); 
 
 // CONNECTION EVENTS
 // When successfully connected
 //mongoose.connection.on('connected', function () {  
 //  console.log('Mongoose default connection open to ' + config);
 //}); 
 
// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./controllers/users.controller'));

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});