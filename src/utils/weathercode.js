const request = require('request')
const moment = require('moment')
const { response } = require('express')
const weatherCode = (latitude, longitude,cb) => {
    const url = `https://api.darksky.net/forecast/d271185736e8ed6ea341e31a970b37a0/${latitude},${longitude}?units=si`
    request({
        url,
        json: true
    }, (err, res) => {
        if (err) {
            cb('cannot connect to weather API',undefined)
        } else if (res.body.error) {
            cb('Cannot find Location .Try another Search.',undefined);
        } else {
            cb(undefined,{

                "time":moment().format('MMMM Do YYYY, h:mm a'),
                 "currentSummary":res.body.currently.summary,
                 "dailySummary":res.body.daily.data[0].summary,
                 "temperature":res.body.currently.temperature,
                 "precipProbability":res.body.daily.data[0].precipProbability,
                 "lat":latitude,
                 "precipType":res.body.daily.data[0].precipType,
                 "tempHigh":res.body.daily.data[0].temperatureHigh,
                 "tempLow":res.body.daily.data[0].temperatureLow,
                  "cloudCover":res.body.daily.data[0].cloudCover,
                 "long":longitude,
                 "windSpeed":res.body.daily.data[0].windSpeed,
                 "humidity":res.body.daily.data[0].humidity
            });
        }
    })

}


 module.exports = weatherCode