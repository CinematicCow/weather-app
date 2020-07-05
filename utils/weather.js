const request=require('request')
const geocode = require('./location')


const forecast=(address,callback)=>{
    const url="https://api.darksky.net/forecast/64b0217e26f004e29478694e3c523736/"+address+"?units=si"
    request({url:url,json:true},(error,response)=>{

           if(error){
               callback('unable to connect to weather services',undefined)
            }else if(response.body.error){
                callback('Incorrect location. Location not found!')
            }else{
                callback(undefined,`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature}°C and there is a ${response.body.currently.precipProbability}% chance of rain today.`)
            
            }
               
}
    )}


module.exports=forecast