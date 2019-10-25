//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  var jsonData = JSON.stringify(data);


  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/269b42f026",
    method: "POST",
    headers: {
      "Authorization": "TakaIbrahim 133e249d02dc1e2b24d573dcdba36620-us4"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
          res.sendFile(__dirname + "/failure.html");
      }
    }
  });

});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("you server running on port 3000");
});

//133e249d02dc1e2b24d573dcdba36620-us4
//269b42f026
