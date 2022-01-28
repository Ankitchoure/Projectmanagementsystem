var db = require('./connection')
function indexmodel()
{
this.registerUser=(userDetails)=>
{
   return new Promise((resolve,reject)=>{
db.collection('register').find().toArray((err,result)=>{
var _id
var flag = true
if(result.length==0)
_id=1
else{
   var max_id = result[0]._id
   for(let row of result)
   {
      if(userDetails.email==row.email)
      {
         flag = false
      }
      if(max_id<row._id)
      {
         max_id = row._id
      }
   }
   _id = max_id+1
}
userDetails._id = _id
userDetails.role = "user"
userDetails.status = 0
userDetails.info = Date()
if(flag)
{
      db.collection('register').insertOne(userDetails,(err,result)=>{
err ? reject(err) : resolve({'s':1})
})
}
else
resolve({'s':0})
})
   })
}

this.verifyUser=(emailid)=>
{
   return new Promise((resolve,reject)=>{
db.collection('register').updateOne({'email':emailid},{$set:{"status":1}},(err,result)=>{
err ? reject(err) : resolve(result)
   })
})
}

this.checkEmail=(emailid)=>
{
   return new Promise((resolve,reject)=>{
db.collection('register').find({"email":{$regex: emailid + '.*'}}).toArray((err,result)=>{
err ? reject(err) : resolve(result)
   }) 
})
}

this.Userlogin=(userDetails)=>
{
   return new Promise((resolve,reject)=>{
   var new_userDetails={}
    new_userDetails.status = 1
    new_userDetails.email = userDetails.email
    new_userDetails.password = userDetails.password
db.collection('register').find(new_userDetails).toArray((err,result)=>{
err ? reject(err) : resolve(result)
   })
})
}
}
module.exports = new indexmodel()