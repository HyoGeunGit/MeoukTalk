module.exports = img;
const multer = require('multer');
const path = require('path')
const rndstring = require('randomstring')

function img(app, Users){
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req,file,cb)=>{
        cb(null, '/root/meouk/MeoukTalk/public/profile');
      },
      filename: (req,file,cb)=>{
        var newStr = rndstring.generate(33);
        newStr = newStr + ".BMP"
        cb(null, newStr);
        //var result = Users.update()
      }
    }),
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });

  app.post('/img', upload.single('img'), async (req,res)=>{
    var name = req.file.filename;
    name = "http://iwin247.info:3000/profile/" + name;
    console.log(name)
    var result = await Users.update({email : req.body.email},{$set : {profileImg : name}})
    res.send(result)
  })
}
