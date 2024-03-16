var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ 
    extended: true 
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error',() => console.log("Error in connectiong to database"))
db.once('open',() => console.log("connected to database"))

app.post("/signup_successful.html",(req,res) => {
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phno = req.body.phno
    var gender = req.body.gender
    var password = req.body.password

    var data = {
        "name" : name,
        "age" : age,
        "email" : email,
        "phno" : phno,
        "gender" : gender,
        "password" : password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("record inserted successfully")
    })
    return res.redirect('signup_successful.html')
})

    function isInputNumber(evt){
    var ch = String.fromCharCode(evt.which);

    if(!(/[0-9]/.test(ch))){
        evt.preventDefault();
    }
}

app.get("/",(req,res) => {
    res.set({
        "allow-access-allow-origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("listening in port 3000")
