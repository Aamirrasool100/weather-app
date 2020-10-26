const request = require('request')
const geoCode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWFtaXItcmFzb29sIiwiYSI6ImNrN29zNnQ0eDAwcHczanFkbWw0cHA2bDkifQ.vXS5yg0MFNf4nMBk5wvnkA&limit=1`
    request({
        url,
        json: true
    }, (err, response) => {
        if (err) {
            cb('Cannot connect to the API',undefined);
        } else if (response.body.features.length === 0) {
            cb('Unable to find loaction',undefined);
        } else {
            return cb(undefined,{
                latitude:response.body.features[0].center[1], 
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}
module.exports = geoCode