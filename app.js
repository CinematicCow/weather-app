const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/location')
const forecast=require('./utils/weather')

const app=express()
app.use(express.static(path.join(__dirname, '/public')));
const partialsDir=path.join(__dirname,'./tempelates/partials')

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'./tempelates/views'))
hbs.registerPartials(partialsDir)

app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        time:getDateTime()
    })
})
app.get('/help',(req,res)=>{
   res.render('help',{
       title:'Help',
       Help:`To search for a location's weather simply type the location you want to search in the search box and hit search. You'll be presented with the needed data`
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        about:`This is a test site to see if API's are working and so on `
    })
})

app.get('/weather',(req,res)=>{
    
        if(!req.query.address){
            return res.send({
                error:"address needed"
            })
        }
        var address=req.query.address
        geocode(address,(error,data)=>{
            if(error){
                return res.send({error:error})
            }
         
             const geolocation=(`${data.latitude},${data.longitude}`)	
            
            forecast(geolocation,(errorf,dataf={})=>{
             if(errorf){
                 return res.send({error:errorf})
             }
             res.send({weather:dataf,location:data.location,address})
         })
         })
     
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:'The help page cannot be found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:'The page cannot be found'
    })
})

app.listen('3000',()=>{
    console.log('started on localhost:3000')
})

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return `${hour}:${min}:${sec}   ${day}/${month}/${year}`;

}