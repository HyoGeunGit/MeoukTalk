module.exports = chat;


function chat(app, io){
  app.get('/cht', (req,res)=>{
    res.render('chat.html');
  })
  const chat = io.of('/chat')
  chat.on('connection', (socket)=>{
    console.log(socket.id);
  })
}
