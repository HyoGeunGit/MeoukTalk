module.exports = auth;

function auth(app, Users, passport){
  app.get('/auth',(req,res)=>{
    res.send('auth test');
  })
  .post('/signin',passport.authenticate('local') , (req,res)=>{
    res.redirect('/');
  })
}
