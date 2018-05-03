const express = require('express');
const app = express()
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

require('./mongo');
let passport = require('./passport')(Users);


app.get('/',(req,res)=>{ res.render('main.html') })
require('./routes/auth')(app, Users, passport, rndstring);







module.exports = app;
