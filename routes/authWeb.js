module.exports = authWeb;

function authWeb(app, Users, passport, rndstring){
  app.use(passport.initialize());
  app.use(passport.session());


  app.post('/signinWeb', async (req,res,next)=>{
    passport.authenticate('local', (err,user,info)=>{
      if(err) { return res.redirect('/login')}
      if (!user) { return res.redirect('/login')}
      return res.redirect('/')
    })(req, res, next)
  })
  .post('/signupWeb', async (req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(15);
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.redirect('/');
  })


}
