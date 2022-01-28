var db = require('./connection')
function adminmodel()
{
/*this.registerUser=(userDetails)=>
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
}*/
this.fetchUser=(collection_name)=>
{
   return new Promise((resolve,reject)=>{
db.collection(collection_name).find({'role':'user'}).toArray((err,result)=>{
err ? reject(err) : resolve(result)
   })
})
}

this.manageUserStatus=(collection_name,urlObj)=>
{
   return new Promise((resolve,reject)=>{
   if(urlObj.s=="block")
   {
 
      //ParseInt ka use isliye kia hai kuki url mai jab bhi data aata hai wo string format mai aata hai or jo humari _id mongo ka data hai wo integer format mai hai so integer or string ek sath match nhi ho paenge mongo mai 
db.collection(collection_name).updateOne({'_id':parseInt(urlObj.regid)},{$set:{'status':0}},(err,result)=>{
err ? reject(err) : resolve(result)
   })
}

else if(urlObj.s=="verify")
{
   db.collection(collection_name).updateOne({'_id':parseInt(urlObj.regid)},{$set:{'status':1}},(err,result)=>{
      err ? reject(err) : resolve(result)
         }) 
}
else
{
   db.collection(collection_name).deleteOne({'_id':parseInt(urlObj.regid)},(err,result)=>{
      err ? reject(err) : resolve(result)
   })
}
   })
}


this.cpadmin=(sunm,pDetails)=>
{
   return new Promise((resolve,reject)=>{  
db.collection('register').find({'email':sunm,'password':pDetails.opass}).toArray((err,result)=>{
if(err)
reject(err)
else
{
if(result.length==0)
resolve(0)
else
if(pDetails.npass!=pDetails.cnpass)
resolve(1)
else
db.collection('register').updateOne({'email':sunm},{$set:{'password':pDetails.cnpass}},(err1,result1)=>{
   err1 ? reject(err) : resolve(2)
      }) 
}
   })
})
}

this.epadmin = (sunm)=>{
   return new Promise((resolve,reject)=>
   {
db.collection('register').find({"email":sunm}).toArray((err,result)=>
{
err ? reject(err) : resolve(result)
})
   })
}
this.UpdateDetails=(userDetails)=>
{
   return new Promise((resolve,reject)=>{
db.collection('register').updateOne({'email':userDetails.email},{$set:{'Name':userDetails.Name,'mobile':userDetails.mobile,'address':userDetails.address,'city':userDetails.city,'gender':userDetails.gender}},(err,result)=>{
err ? reject(err) : resolve(result)
})
   })
}
}
module.exports = new adminmodel() 