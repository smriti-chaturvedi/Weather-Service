const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c21f1f2dde99aa5bd50d8bf95cb5bc6d&query=' +  latitude + ',' + longitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Please connect to a network!', undefined)
        }
        else if(body.error) {
            callback('Unable to find location. Please try again!', undefined)
        }
        else{
           const result = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees. The humidity is ${body.current.humidity} %.`;
           callback(undefined, result)
        }
    })
}

module.exports = forecast