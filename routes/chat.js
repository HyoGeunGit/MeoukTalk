module.exports = chat;


function chat(app, io){
  app.get('/chat', (req,res)=>{
    res.render('chat.html');
  })
  var cnt = 1
  io.on('connection', (socket)=>{
    
  })
}
