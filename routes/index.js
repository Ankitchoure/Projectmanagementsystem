var express = require('express');
var router = express.Router();
var url = require('url');


//to remove user
var cunm,cpass
cunm=""
cpass=""

router.all('/login',function(req,res,next){
req.session.sunm='undefined'
req.session.srole='undefined'

if(req.cookies.cunm!=undefined)
{
 cunm = req.cookies.cunm
  cpass = req.cookies.cpass
}

console.log(req.cookies)

next()
});

var indexmodel = require('../Models/indexmodel')
var  sendMail = require('./emailApi')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/service', function(req, res, next) {
  res.render('service');
});

router.get('/register', function(req, res, next) {
  res.render('register',{"output":""});
});


router.post('/register', function(req, res, next) {
  //console.log(req.body)
  indexmodel.registerUser(req.body).then((result)=>
  {
    if(result.s)
    {
     sendMail(req.body.email,req.body.password)
      res.render('register',{"output":"User Register successfully"});
    }
      else
    res.render('register',{"output":"User already exists please try again later"});   
  }).catch((err)=>
  {
console.log(err)
  })
})

router.get('/verifyUser', function(req, res, next) {
  var emailid = url.parse(req.url,true).query.email
  indexmodel.verifyUser(emailid).then((result)=>
  {
     res.redirect('login')
  }).catch((err)=>
  {
    console.log(err)
  })
  //res.send("hello")
});


router.get('/checkEmail', function(req, res, next) {
  var emailid = req.query.emailid
  indexmodel.checkEmail(emailid).then((result)=>
  {
    if(result.length==0)
    matchstatus = 0
    else
    matchstatus = 1
    res.json({'matchstatus':matchstatus})
  }).catch((err)=>
  {
    console.log(err)
  })

  //res.send("<h1>hello</h1>")
});

router.get('/login', function(req, res, next) {
  res.render('login',{'cunm':cunm,'cpass':cpass,'output':''});
});

router.post('/login', function(req, res, next) {
 //console.log(req.body)
 indexmodel.Userlogin(req.body).then((result)=>
 {
   if(result.length==0)
   
    res.render('login',{'cunm':cunm,'cpass':cpass,'output': 'Invalid User or Authenticate your account'});
  else{ 
    //to store user details in session
    req.session.sunm=result[0].email
    req.session.srole=result[0].role
    //to store user details in cookie
   if(req.body.chk!=undefined)
   {
     res.cookie('cunm',req.body.email,{maxAge:360000});
     res.cookie('cpass',req.body.password,{maxAge:360000});
   }
   
    if(result[0].role=="user")
    res.redirect('/user');
else
res.redirect('/admin');
  }  
  }).catch((err)=>{
    console.log(err)
  })
});

/*router.get('/loginApi', function(req, res, next) {
  //console.log(req.body)
  indexmodel.Userlogin(req.query).then((result)=>
  {
    if(result.length==0)
    res.send("login failed")
    else
    {
     if(result[0].role=="user")
     res.send("login successfully as user")
 else
 res.send("login successfully as admin")
   }  
   }).catch((err)=>{
     console.log(err)
   })
  });*/
module.exports = router;
