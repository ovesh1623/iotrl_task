const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

const app = express();

app.use(expressLayouts);
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
// create application/json parser
var jsonParser = bodyParser.json();
app.post('/',jsonParser,(req,res)=>{
    const PI = 3.1415926535;
    const geocenter_lat = (19.137039/180.0)*PI; //Latitude of the center of cricle
    const geocenter_long = (72.844204/180.0)*PI; //Longitude of the center of cricle
    const geo_radius = 2;// Distance in km
    const my_lat = (parseFloat(req.body.lat)/180.0)*PI;
    const my_long = (parseFloat(req.body.long)/180.0)*PI;
    const dlat = parseFloat(geocenter_lat - my_lat);
    const dlong = parseFloat(geocenter_long-my_long);

    //Formula for calculating the distance
    var ans = Math.pow(Math.sin(dlat / 2), 2) +  Math.cos(geocenter_lat) * Math.cos(my_lat) * Math.pow(Math.sin(dlong / 2), 2); 
    ans = 2 * Math.asin(Math.sqrt(ans)); 
  
    // Radius of Earth in  
    // Kilometers, R = 6371 
    // Use R = 3956 for miles
    const R = 6371; 
      
    // Calculate the result 
    ans = ans * R; 
    console.log(`Distance between center and me is ${ans}`);
    if(geo_radius > ans){
        res.send("You are inside the fence");
    }else{
        res.send("You are outside the fence");
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT , console.log(`Server started on port ${PORT}`));