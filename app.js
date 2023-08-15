const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const request = require('request');
const https = require('https');

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'));

app.listen(process.env.PORT || 3000 ,function(){
    console.log('server is running on port 3000');
});

app.get('/',function(req,res){

    res.sendFile(__dirname + '/signup.html')

app.post('/', function(req,res){

    const fn = req.body.fname;
    const ln = req.body.lname;
    const email = req.body.email;

    const data = {

        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fn,
                    LNAME: ln
                }
            }
        ]

    };

    const jsonData = JSON.stringify(data);

    url = "https://us21.api.mailchimp.com/3.0/lists/dd382eef57";

    options = {
        method: "POST",
        auth: "Shoaib10:0420ede976532e73f2f656024c859456-us21"
    }

    const request = https.request(url,options,function(response){

        if (response.statusCode===200) {

            res.sendFile(__dirname + '/success.html');
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){

            console.log(JSON.parse(data));
        })

    })

    request.write(jsonData);
    request.end(); 

});

});

app.post("/failure.html",function(req,res){
    res.redirect("/");
});


// api key = 0420ede976532e73f2f656024c859456-us21 , audience id = dd382eef57