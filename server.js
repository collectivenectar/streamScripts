// set up variables

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const Transcript = require('./models/transcriptModel.js')
require('dotenv').config()

// set up middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// connect to db

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to database')}
)

// ROUTES

// search by single word

app.post("/search", async (request, response) => {
  return Transcript.find({entry: {$regex: String(request.body.query)}})
  .exec()
  .then((transcript) => {
    console.log(transcript.length)
    return transcript
  })
  .catch((err) => {
    console.log(err)
    return 'error occurred'
  })
})

// Main page

app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})

// Load search results

app.get('/results', async (request, response) => {
    try {
        response.render('results.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})

// Browse by course, browse by topic?

app.get('/browse', async (request, response) => {
    try {
        response.render('browse.ejs')
    } catch (err) {
        if (err) return response.status(500).send(err)
    }
})

// listen to routes

app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))
