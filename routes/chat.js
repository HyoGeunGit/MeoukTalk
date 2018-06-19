module.exports = chat;


function chat(app, io, Users, Rooms, rndstring){
  app.get('/cht', (req,res)=>{
    res.render('chat.html');
  })
  .post('/room', async (req,res)=>{
    var roomID = rndstring.generate(50);
    var room = new Rooms(roomID);
    var Rresult = await room.save();
    let result = await Users.update({"email" : req.body.email},
      {$push : {roomInvite : roomID}}
    )
    if(!result.ok) return res.status(500).json({message : "ERR!"});
    else return res.status(200).json({roomID : roomID});
  })
  .post('/invite', async (req,res)=>{
    let result = await Users.update({"email" : req.body.email},
      {$push : {roomInvite : req.body.roomID}}
    )
    if(!result.ok) return res.status(500).json({message : "ERR!"});
    else return res.status(200).json({message : "success!"});
  })
  .post('/accept', async (req,res)=>{
    let result = await Users.update({"token" : req.body.token},
      {$pop : {roomInvite : req.body.roomID}}
    )
    if(!result.ok) return res.status(500).json({message : "ERR!"});
    else return res.status(200).json({message : "success!"});
  })
  .post('/roomchk', async(req,res)=>{
    let result = await Users.findOne({token : token})
    if(!result) return res.status(404).json({message : "User Not Found!"})
    else return res.status(200).json({list : result.roomInvite})
  })
  var count = 0;
  io.on('connection', function(socket){
    console.log('user connected: ', socket.id);
    var name = "user" + count++;
    io.to(socket.id).emit('change name',name);
    socket.on('disconnect', function(){
      console.log('user disconnected: ', socket.id);
    });
    socket.on('send message', function(name,text){
      var msg = name + ' : ' + text;
      console.log(msg);
      io.emit('receive message', msg);
    });
  });
  // io.on('connection', (socket)=>{
  //   socket.on('disconnect', ()=>{ console.log('user disconnect')})
  //   socket.on('join room', (name, room)=>{
  //     var text = name + "님이 방에 들어왔습니다.";
  //     io.to(room).emit('welcome room', name, text);
  //     socket.join(room);
  //   })
  //   socket.on('leave room', (name, room)=>{
  //     var text = name + "님이 방에서 나갔습니다.";
  //     io.to(room).emit('goodbye room', name, text);
  //     socket.leave(room);
  //   })
  //   socket.on('send message', (name, index, room)=>{
  //     io.to(room).emit('receive message', name, index, room);
  //   })
  // })
}
