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
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// connect to db

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    (error) => {
      if(error){
        console.log(error)
      }
      console.log('Connected to database')}
)

// ROUTES

app.post("/search/entry/allOrdered", async (request, response) => {
  // This setup is for regex search of any ENTRY field containing all words, in that order
  let lowerCasedEntry = String(request.body.entry).toLowerCase()
  return Transcript.find({"entry": {$regex: String(lowerCasedEntry)}})
  .exec()
  .then((transcript) => {
    console.log(transcript.length)
    response.send(transcript)
  })
  .catch((err) => {
    console.log(err)
    return 'error occurred'
  })
})

app.post("/search/entry/allUnordered", async (request, response) => {
  // This setup is for regex search of any ENTRY field containing all of the words(any order)
  const queryString = request.body.entry.toLowerCase()
  const queryStrings = queryString.split(" ")
  let allQueries = []
  queryStrings.forEach(element => {
    allQueries.push({"entry": {$regex: String(element)}})
  })
  return Transcript.find({$and: allQueries})
  .exec()
  .then((transcript) => {
    response.send(transcript)
  })
  .catch((err) => {
    console.log(err)
    response.status(500).send(err)
  })
})

app.post("/search/timestamp/byCourseNumber", async (request, response) => {
  // This setup is for regex search of any TIMESTAMP related to a course number (1-41 currently)
  let courseNumber = request.body.timestamp
  return Transcript.find({timestamp: new RegExp("^" + courseNumber + "-")})
  .exec()
  .then((transcript) => {
    response.send(transcript)
  })
  .catch((err) => {
    console.log(err)
    response.status(500).send(err)
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
