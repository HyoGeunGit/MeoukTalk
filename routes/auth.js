module.exports = auth;

function auth(app, Users, passport, rndstring){

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth',(req,res)=>{
    res.send('auth test');
  })
  .get('/err', (req,res)=>{
    res.status(404).json({message : "User Not Fiound!"});
  })
  .post('/signin',passport.authenticate('local', {failureRedirect: '/err'}), (req,res)=>{
    res.status(200).json({user : req.session.passport.user});
    //res.redirect('/');
  })
  .post('/signup', async (req,res)=>{
    var user = new Users(req.body);
    user.token = rndstring.generate(15);
    try {
      var result = await user.save();
    }catch(e){  // e instanceof user_duplicate ||
      if(e instanceof user_duplicate){
        console.log('ERR!');
        return res.status(409).json({message:"already exist"});
      }
      if(e instanceof ValidationError) return res.status(400).json({message: e.message});
      if(e instanceof paramsError) return res.status(400).json({message: e.message});
    }
    res.status(200).json(user);
  })
  .post('/aa', async (req,res)=>{
    var result = await Users.find();
    res.send(result);
  })
}
