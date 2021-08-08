const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended:true
}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apikey = "399a7a4215111e1960ec7b54fbb13a66";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid="+ apikey+"&units=" +units;
  https.get(url,function(response){
    response.on("data", function(data){
      const weatherData  = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc=weatherData.weather[0].description;
      res.write("<p> The weather is currently " + weatherDesc + "</p>");
      res.write("<h1> The temp in " + query + " is " + temp + "</h1>");

      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "10d@2x.png";
      res.write("<img src =" +imageURL+ ">");

      res.send();
    });
  });
});





app.listen(3000, function(){
  console.log("Server running on 3000");
});
