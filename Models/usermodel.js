var db = require('./connection')
function usermodel()
{
this.payment=(pDetails)=>
{
   return new Promise((resolve,reject)=>{
db.collection('payment').find().toArray((err,result)=>{
var _id
if(result.length==0)
_id=1
else{
   var max_id = result[0]._id
   for(let row of result)
   {
      if(max_id<row._id)
      {
         max_id = row._id
      }
   }
   _id = max_id+1
}
pDetails._id = _id
pDetails.info = Date()

      db.collection('payment').insertOne(pDetails,(err,result)=>{
err ? reject(err) : resolve({result})
})

})
   })
}

}
module.exports = new usermodel() 