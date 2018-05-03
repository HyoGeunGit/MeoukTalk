var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/MeoukTalkDB1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });



var UsersSchema = mongoose.Schema({
  id : {type : String, unique : true, required : true},
  passwd : {type : String , required : true},
  name : {type : String, required : true},
  email : {type : String, default : 0},
  phone : {type : String},
  token : {type : String}
});
Users = mongoose.model('users', UsersSchema);


require('./err')(UsersSchema);


exports.Users = Users;
exports.db = db;
