module.exports = auth;

function auth(app, Users, passport, rndstring){

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth',(req,res)=>{
    res.send('auth test');
  })
  // .post('/signin',(req,res,next)=>{
  //   passport.authenticate('local', (err,user,info)=>{
  //     if(err) { return res.status(401).json({message : err.message})}
  //     if (!user) { return res.status(401).json({message : err.message})}
  //     return res.status(200).json({message:"Signin Success!"});
  //   })(req, res, next)
  // })
  .get('/auto/:token', async(req,res)=>{
    var token = req.params.token;
    var result = await Users.findOne({"token":token});
    if(!result) return res.status(404).json({message : "Not found user"})
    else return res.status(200).json({message : "Signin Success!"})
  })
  .post('/signin', async(req,res)=>{
    var result = await Users.findOne({"id":req.body.id,"passwd":req.body.passwd});
    if(!result)return res.status(404).json({message : "User Not Found!"})
    return res.status(200).json({message : "Signin Success!"})
  })
  .post('/signinWeb',passport.authenticate('local', {failureRedirect: '/login'} ), (req,res)=>{
    res.redirect('/');
  })
  .post('/signup', async (req,res)=>{
    var user = new Users(req.body);

    user.token = rndstring.generate(15);
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).json(user);
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
  .post('/aa', async (req,res)=>{
    var result = await Users.find();
    res.send(result);
  })
}
