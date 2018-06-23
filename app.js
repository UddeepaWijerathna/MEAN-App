// Express framework
const express =require('express');
//require path
const path =require('path');
const bodyParser =require('body-parser');
const cors =require('cors');
//Middleware for authenticate
const passport =require('passport');
//require mongoose
const mongoose = require('mongoose');

//require the database file here
const config = require('./config/database')

const user = require('./routes/users');

const app = express();



const connection = mongoose.connect(config.database);
if(connection){
    console.log("database connected");
}else{
    console.log("database not connected");
}
// port number of server
const port = 3000;
//path to static files (current directory->public folder)
app.use(express.static(path.join(__dirname,"public")));

//CORS Middleware
app.use(cors());
//Body Parser Middleware 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/user',user);

// start server
//callback function using arrow
app.listen(port, ()=> {
    console.log('Server started on port'+ port);
})