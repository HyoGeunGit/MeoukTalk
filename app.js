const express = require('express');
const app = express()
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const rndstring = require('randomstring');
const ejs = require('ejs')
var cookieSession = require('cookie-session');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(cookieSession({
  keys: ['h0t$ix'],
  cookie: {
    maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}))
require('./func');
require('./mongo');
let passport = require('./passport')(Users);

app.get('/',(req,res)=>{ res.render('main.html') })
require('./routes/auth')(app, Users, passport, rndstring);
require('./routes/loginGet')(app);







module.exports = app;
