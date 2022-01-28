var express = require('express');
var router = express.Router();
var url = require('url')
var adminmodel = require('../Models/adminmodel')

//to check admin users
router.use(function(req, res, next){
if(req.session.sunm==undefined || req.session.srole!='admin') {
res.redirect('/login')
}
else{
  next()
}
});


/* GET users listing. */
router.get('/', function(req, res, next) {
 // console.log(req.session.sunm)
  //console.log(req.url)
  res.render('adminhome',{'sunm':req.session.sunm});
});
router.get('/manageusers', function(req, res, next) {
 // console.log(req.session.sunm)
  adminmodel.fetchUser('register').then((result)=>{
   // console.log(result)
    res.render('manageusers',{'result':result,'sunm':req.session.sunm});
  }).catch((err)=>
  {
    console.log(err)
  })
  //console.log(req.url)
});

router.get('/manageuserstatus', function(req, res, next) {
var urlObj = url.parse(req.url,true).query
var collection_name = 'register'
  adminmodel.manageUserStatus(collection_name,urlObj).then((result)=>{
    //console.log(result)
    res.redirect('/admin/manageusers');
  }).catch((err)=>
  {
    console.log(err)
  })
  //console.log(req.url)*/
});

router.get('/cpadmin', function(req, res, next) {
   res.render('cpadmin',{'sunm':req.session.sunm,'output':''});
 });

 router.post('/cpadmin', function(req, res, next) {
  adminmodel.cpadmin(req.session.sunm,req.body).then((result)=>
  {
    //console.log(result)
    if(result==0)
    msg="Invalid old password, please try again"
    else if(result==1)
    msg="New & confirm password not match, please try again"
    else
    msg="Password updated successfully"
    res.render('cpadmin',{'sunm':req.session.sunm,'output': msg});
  }).catch((err)=>
  {
    console.log(err)
  })
});
  // console.log(req.body)
  router.get('/epadmin', function(req, res, next) {
    adminmodel.epadmin(req.session.sunm).then((result)=>
    {
      //console.log(result[0])
     var m,f
     m="",f=""
     if(result[0].gender =="male")
     m = "checked"
     else
     f = "checked"
     var msg =""
     if(req.query.s)
     msg = "Profile update successfully"

      res.render('epadmin',{'userDetails':result[0],'m':m,'f':f,'sunm':req.session.sunm,'output':msg});
    }).catch(()=>
    {
      console.log(err)
    })
  });

  router.post('/epadmin', function(req, res, next) {
     adminmodel.UpdateDetails(req.body).then((result)=>{
    res.redirect('/admin/epadmin?s=true')  
    }).catch((err)=>
     {
       console.log(err)
     })
   });
module.exports = router;
