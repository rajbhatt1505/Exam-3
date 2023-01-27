const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const fs = require('fs');
const port = process.env.port || 8080
const authRoute = require('./routes/auth-route');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require("cookie-parser");
var morgan = require("morgan");
// const book = require('./middleware/multer');
const multer = require('multer')

const path = require('path')


app.use(cookieParser())
app.use(express.json())
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/Exam-3', (err) => {
    if (err) {
        console.log("Database is Not Connected !");
    } else {
        console.log("DataBase is Connected........");
    }
});
app.use(morgan('dev'));
// app.use(express.static('./uploads'));
app.use(express.static(path.join(__dirname, 'storage')));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
    cors({
      origin: ["http://localhost:4200", "*"],
      credentials: true,
    })
  );
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id,authorization");
  
    next();
  });
app.use('/auth', authRoute);
app.get('/', (req, res) => {
    res.send("Welcome  here")
})
app.use(express.static('./uploads'));
app.listen(port, () => {
    console.log("Node server is Connected", port);
})
//storage

module.exports = app
