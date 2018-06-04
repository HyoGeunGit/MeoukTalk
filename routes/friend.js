module.exports = friend;


function friend(app, Users){
  app.post('/add', async(req,res)=>{
    var result1 = await Users.findOne({email : req.body.email});
    console.log(result1)
    if(!result1) return res.status(404).json({message : "User Not Found!"})
    var result2 = await Users.findOne({token : req.body.token})
    console.log(result2)
    if(!result2) return res.status(404).json({message : "User Not Found!"})
    var friend = {
      name : result1.name,
      email : result1.email,
      profileImg : result1.profileImg
    }
    var me = {
      name : result2.name,
      eamil : result2.email,
      profileImg : result2.profileImg
    }
    var result3 = await Users.update(
      {"token" : req.body.token},
      {$push : {friendList : friend}}
    )
    if(!result3.ok) return res.status(401).json({message : "ERR!"})
    var result4 = await Users.update(
      {"email" : req.body.email},
      {$push : {friendList : me}}
    )
    if(!result4.ok) return res.status(401).json({message : "ERR!"})
    res.status(200).json({message : "add success!"})
  })
  .post('/del', async(req,res)=>{

  })
}
