var nodemailer = require('nodemailer')
function sendMail(email,password)
{
var transport = nodemailer.createTransport(
    {
service: 'gmail',
auth:
{
    //Alwase type in authentication user and pass not username and password
    user: 'Achourey1810@gmail.com',
    pass: 'King@568'
}
    })
    var mailoptions ={
from: 'Achourey1810@gmail.com',
to:   email,
subject:'Verification successfully throgh nodemailer',
html: "<h1>Wrelcome to Ankit management system </h1><p>You have successfully registered on our application,your login credentials are attached below</p><h2>Username: "+email+"</h2><h2>Password: "+password+"</h2><h1>please check on the link to verify account</h1>http://localhost:3000/verifyUser?email="+email     
    }
    transport.sendMail(mailoptions,(error, info)=>
    {
        if(error)
        {
            console.log(error)
        }
            else
            {
                console.log('Email sent:' +info.response)
            }
        
    })
}
module.exports = sendMail