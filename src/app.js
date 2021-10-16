const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Set up handlerbars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Smriti Chaturvedi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Smriti Chaturvedi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Smriti Chaturvedi',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, result) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: result,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page Not found',
        name: 'Smriti Chaturvedi'
    })
})


app.listen(3000, () => {
    console.log('Server is up and running!')
})