var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/TimeStoneTest1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var RoomSchema = mongoose.Schema({
  roomID : {type : String}
});

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
    phone : {type : String},
    profileImg : {type : String}
  }],
  roomInvite : [{
    roomID : {type : String}
  }],
  roomList : [{
    roomID : {type : String}
  }]
});
Users = mongoose.model('users', UsersSchema);
Rooms = mongoose.model('rooms', RoomSchema);

require('./err')(UsersSchema);

exports.Rooms = Rooms;
exports.Users = Users;
exports.db = db;
