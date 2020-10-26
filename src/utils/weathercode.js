const request = require('request')

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
            cb(undefined,`${res.body.daily.data[0].summary} It is currently ${res.body.currently.temperature} degrees out.There is a ${res.body.currently.precipProbability}% chance of rain.`);
        }
    })

}

module.exports = weatherCode