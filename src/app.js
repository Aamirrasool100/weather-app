const express = require('express')
const request = require('request')
const fs = require('fs')
const geoCode = require('./utils/geocode')
const weatherCode = require('./utils/weathercode')
const path = require('path')
const ejs = require('ejs')
const { urlencoded } = require('express')
const app = express()
const port = process.env.PORT || 5000
const viewsPath = path.join(__dirname,'../src/templates/views')
const partialsPath = path.join(__dirname,'../src/templates/partials')
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine','ejs')
app.use(express.json(urlencoded({extenedd:true})))
app.set('views',viewsPath)
// ejs.registerPartials(partialsPath)
app.get('/',(req,res)=>{
    res.render('index',{
        name:"amir"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
    return res.send({
        error:'you must provide an address'
    })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }
        weatherCode(latitude,longitude,(error,{time,precipType,humidity,
            temperature,lat,long,
            precipProbability,windSpeed,currentSummary,
            cloudCover,dailySummary,tempLow,
            tempHigh} = {})=>{
            if(error){
                return res.send({error})
            }
            console.log();
            res.send({
                time,
                humidity,
                temperature,
                lat,
                long,
                precipProbability,
                windSpeed,
                currentSummary,
                dailySummary,
                cloudCover,
                precipType:"rain",
                tempHigh,
                tempLow
            })
        })
    })
})
app.post('/weather',(req,res)=>{
    
    
})
app.get('/about',(req,res)=>{
    res.render('about',{name:'amir'})
})
app.get('/help',(req,res)=>{
    res.render('help',{name:'amir'})
})

app.get('*',(req,res)=>{
    res.render('404')
})
app.listen(port,console.log('listening on port ' + port))