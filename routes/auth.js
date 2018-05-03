module.exports = auth;

function auth(app, Users, passport, rndstring){

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth',(req,res)=>{
    res.send('auth test');
  })
  .post('/signin',passport.authenticate('local') , (req,res)=>{
    res.redirect('/');
  })
  .post('/signup', async (req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(15);
    var result = await user.save();
    if(result)
      return res.status(200).json({message : "Signup Success!"});
    else
      return res.status(500).json({message : "Signup Fail!"});
  })
  .post('/aa', async (req,res)=>{
    var result = await Users.find();
    res.send(result);
  })
}
