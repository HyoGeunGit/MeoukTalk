module.exports = chat;


function chat(app, io, Users){
  app.get('/cht', (req,res)=>{
    res.render('chat.html');
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
