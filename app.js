const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const fName = req.body.fName;
    const lName = req.body.lName;
    const email_id = req.body.email;
    const list_id = "63f23eae66";
    const key_id = "de0a17b89dface16b2ffdd6c40f4e85c" ;
    var data = {
        members:[
            {
                email_address:email_id,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data); //string converts to JSON
    const url = "https://us10.api.mailchimp.com/3.0/lists/"+list_id;
    
    const option = {
        method:"POST",
        auth:"Aditya:de0a17b89dface16b2ffdd6c40f4e85c-us10"
    }
    const request = https.request(url,option,function(response){
        if(response.statusCode == 200)
            res.sendFile(__dirname+"/success.html");
        else 
            res.sendFile(__dirname+"/failure.html");
        
        response.on("data", function(data){
           // console.log(JSON.parse(data));
        })
    })
  //  request.write(jsonData); 
    request.end();
    
});

    app.post("/failure", function(req,res){
        res.redirect("/")
    });


// 63f23eae66 list id

// de0a17b89dface16b2ffdd6c40f4e85c-us10 apikey US-10 ka server !   



app.listen(process.env.PORT || 3000,function(){
    console.log("LISTENING ON 3000");
})