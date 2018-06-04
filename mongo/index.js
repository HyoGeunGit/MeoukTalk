var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/MeoukTalkDB3');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });



var UsersSchema = mongoose.Schema({
  passwd : {type : String , required : true},
  name : {type : String, required : true},
  email : {type : String, unique : true, required : true},
  phone : {type : String},
  token : {type : String},
  profileImg : {type : String},
  friendList : [{
    name : {type : String},
    email : {type : String},
    profileImg : {type : String}
  }]
});
Users = mongoose.model('users', UsersSchema);


require('./err')(UsersSchema);


exports.Users = Users;
exports.db = db;
