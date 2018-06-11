module.exports = auth;

function auth(app, Users, rndstring,path,multer){
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req,file,cb)=>{
        cb(null, '/root/meouk/MeoukTalk/public/profile/'); ///root/meouk/MeoukTalk/public/profile/
      },
      filename: (req,file,cb)=>{
        var newStr = rndstring.generate(33);
        newStr = newStr + ".BMP"
        cb(null, newStr);
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });
  app.get('/auto/:token', async(req,res)=>{
    var token = req.params.token;
    var result = await Users.findOne({"token":token});
    if(!result) return res.status(404).json({message : "Not found user"})
    else return res.status(200).json({user : result})
  })
  .post('/signin', async(req,res)=>{
    var result = await Users.findOne({"email":req.body.email,"passwd":req.body.passwd});
    if(!result)return res.status(404).json({message : "User Not Found!"})
    return res.status(200).json({token : result.token})
  })
  .post('/signup', upload.single('profileImg'), async (req,res)=>{
    var fName = req.file.filename;
    fName = "http://"+"iwin247"+".info:3000/profile/" + fName;
    var user = new Users({
      email : req.body.email.replace(/"/gi,''),
      passwd : req.body.passwd.replace(/"/gi,''),
      name : req.body.name.replace(/"/gi,''),
      phone : req.body.phone.replace(/"/gi,''),
      token : rndstring.generate(25),
      profileImg : fName
    });
    try {
      var result = await user.save();
    }catch(e){
      if(e instanceof user_duplicate) return res.status(409).json({message:"already exist"});
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
