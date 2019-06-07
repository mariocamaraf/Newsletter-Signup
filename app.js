//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
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

  var option = {
    url: "https://us20.api.mailchimp.com/3.0/lists/19f55a05a9",
    method: "POST",
    headers: {
      "Authorization": "mario1 b6bfa426814b21b4e1e3f4d42e26a4d1-us20"
    },
      body: jsonData
  };
  request(option, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

    }

  });

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() { //used to be 3000 Instead of process...
  console.log("Server is running on port 3000");
});

//api key
//b6bfa426814b21b4e1e3f4d42e26a4d1-us20

//list id / audience id
//19f55a05a9
