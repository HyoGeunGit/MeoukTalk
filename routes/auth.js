module.exports = auth;

function auth(app, Users){  
  app.get('/auth',(req,res)=>{
    res.send('auth test');
  })
}