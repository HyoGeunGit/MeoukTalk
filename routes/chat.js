module.exports = chat;


function chat(app, io){
  app.get('/chat', (req,res)=>{
    res.render('chat.html');
  })
  var cnt = 1
  io.on('connection', (socket)=>{
    console.log('New Connection! : ', socket.id);

    var name = "user" + cnt++;
    io.to(socket.id).emit('change name : ', name);

    socket.on('disconnect', ()=>{
      console.log('User Disconnected: ', socket.id);
    })

    socket.on('send message', (name, text)=>{
      var msg = name + ' : ' + text;
      console.log(msg);
      io.emit('receive message', msg)
    })
  })
}
