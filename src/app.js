const express = require('express')
const request = require('request')
const fs = require('fs')
const geoCode = require('./utils/geocode')
const weatherCode = require('./utils/weathercode')
const path = require('path')
const ejs = require('ejs')
const { urlencoded } = require('express')
const app = express()
const port = process.env.PORT
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
        weatherCode(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                "forecast":data,
                location,
                "address":req.query.address
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
app.listen(port || 5000,console.log('listening on port ' + port))