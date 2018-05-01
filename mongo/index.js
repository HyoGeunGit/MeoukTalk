var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/MeoukTalkDB');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });



var UsersSchema = mongoose.Schema({
  id : {type : String, unique : true, required : true},
  passwd : {type : String , required : true},
  name : {type : String, required : true},
  email : {type : String, default : 0},
  phone : {type : String}
});
Users = mongoose.model('users', UsersSchema);


exports.Users = Users;
exports.db = db;