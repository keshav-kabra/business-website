
const express = require('express')
const nodemailer = require('nodemailer')
const bodyparser = require('body-parser')
const app = express()

app.use(express.static(__dirname+'/public'));
app.set('view engine' , "ejs");


//body-parser middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

//home page
app.get('/', (req, res)=>{
    var alert_on = {
        val : 'false'
    }
    res.render('home', {data : alert_on})
})

app.post('/' , (req, res)=>{
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
    var alert_on = {
        val : 'true'
    }    

    const transporter = nodemailer.createTransport({
        service : 'gmail',
        auth:{
            user : 'jssangmarmar@gmail.com',
            pass : '' //here goes paassword
        },
    })

    const mailoptions = {
        form: email,
        to : 'jssangmarmar@gmail.com',
        subject : 'email from ' + email +' : '+subject,
        text : message       
    }


    transporter.sendMail(mailoptions,(err, info)=>{
        if(err){
            console.log(err)
            res.send(err)
        }else{
            
        }
    })
    
    res.render('home' , {data :  alert_on});


})



app.listen(3000 , ()=>{
    console.log('server is running ')
})