var express = require("express"),
http = require("http"),
app = express(),
bodyParser = require('body-parser'),
fs = require('fs')
;

    /*
session = require('express-session'),
    cookieParser = require('cookie-parser')
    app.use(cookieParser());
app.use(session({secret: '473'})); 

*/
var userDB =[{"username": "tommy", "password": "123456", "movie": ["the matrix", "saving private ryan"], "game": ["gta", "final fantasy vii", "wow"], "books": []}];
var loginUser =[];

app.use('/public',  express.static(__dirname + '/public'));


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));  

var User = require('./User.js');


// create HTTP server/
http.createServer(app).listen(3000);

app.post("/signIn", function (req, res) {
    var login = req.body;

    userDB.forEach(function(element) {
        if (login.username === element.username) {

            if (login.password === element.password) {
                console.log(element);
                res.json(element);
            }

        } 

    });
    console.log(login.username);
    console.log("logged in!");

    //res.json({"message":"You posted to the server!"});
});

app.post("/updateMovie", function (req, res) {
    var currentUser = req.body;

    userDB.forEach(function(element, index, array) {
        if (currentUser.username === element.username) {
            console.log("success");
            array[index].movie = currentUser.movie;
            console.log(array[index]);
            res.json("works");
        }
    });

});

/*app.post('/getLoginUser.json',function (req, res) {
        //must be change to session 
        console.log('loginUser:'+loginUser);
        if(loginUser.length > 0) res.json(JSON.stringify(loginUser[0]));
        else res.json('{}');
    });

// set up our routes
app.post("/signup", function (req, res) {
    // User (emailId,password,firstName,lastName,birthDate) 
    var user = new User(req.body.emailId,req.body.password,
                        req.body.firstName,req.body.lastName,req.body.radiobutton,
                        new Date(req.body.b_year,req.body.b_month,req.body.b_day));
    userDB.push(user);
    loginUser.push(user);
    console.log(user.getInfo());
    res.sendFile('public/index.html', {root: __dirname });
});
app.post("/signup.show", function (req, res) {
    console.log('in post /signup.show')
    res.sendFile('public/signup.html', {root: __dirname });
});

app.get("/signup.show", function (req, res) {
    console.log('in get /signup.show')
    res.sendFile('public/signup.html', {root: __dirname });
});*/
app.get("/", function (req, res) {
    res.sendFile('public/index.html', {root: __dirname });
});


console.log("server listening on port 3000");
