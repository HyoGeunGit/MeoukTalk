module.exports = chat;


function chat(app, io, Users){
  app.get('/cht', (req,res)=>{
    res.render('chat.html');
  })
  // const chat = io.of('/chat')
  // chat.on('connection', (socket)=>{
  //   console.log('new User! : ', socket);
  //   socket.on('disconnect', ()=>{
  //     console.log('User Disconnect : ', socket.id);
  //   })
  // })
  var count = 0;
  io.on('connection', function(socket){ //3
    console.log('user connected: ', socket.id);  //3-1
    var name = "user" + count++;                 //3-1
    io.to(socket.id).emit('change name',name);   //3-1
    socket.on('disconnect', function(){ //3-2
      console.log('user disconnected: ', socket.id);
    });

    socket.on('send message', function(name,text){ //3-3
      var msg = name + ' : ' + text;
      console.log(msg);
      io.emit('receive message', msg);
    });
  });

}
