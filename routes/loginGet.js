module.exports = loginWeb;

function loginWeb(app){
  app.get('/login', (req,res)=>{
    res.render('login.html');
  })
  .get('/reg', (req,res)=>{
    res.render('register.html');
  })
}
