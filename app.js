const { response } = require("express")
const express=require("express")

const app=express()

const bodyparser=require("body-parser")

const https=require("https")



app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res)
{
   
   res.sendFile(__dirname+"/index.html") 
    
})


app.post("/",function(req,res){
    
    const query=req.body.cityName
    const apiKey="191e9e4b7a69eab99d34aece14d1f19f"
    const unit="metric"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode)
        
        response.on("data",function(data){
            const weatherData=JSON.parse(data)
           const icon1=weatherData.weather[0].icon
            const imageUrl="http://openweathermap.org/img/wn/"+icon1+"@2x.png"
           const temp=weatherData.main.temp
            res.write('<head><meta charset="utf-8"></head>');
           
            res.write("<h1>The temperatur in  "+query+" is " +temp+ " degree celcius.</h1>");
            res.write("<img src="+imageUrl+">");
       res.send()
         
        })
        
       
    })
    
})




app.listen(3000,function(){
    console.log("Server is runnig on port 3000")
})
