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

app.get("/search/entry/allOrdered", async (request, response) => {
  // This setup is for regex search of any ENTRY field containing all words, in that order

  // Pagination setup
  let perPage = 10
  let page = 1

  let lowerCasedEntry = String(request.body.entry).toLowerCase()
  let query = {"entry": {$regex: String(lowerCasedEntry)}}
  return Transcript.find(query).skip((perPage * page) - perPage).limit(perPage)
  .exec((error, transcriptsList) => {
    Transcript.count(query).exec((error, count) => {
      if(error) return next(error)
      if(count === 0){
        response.render('results.ejs', {
          transcripts: [{
            timestamp: "0-0",
            entry: `No results found for '${request.body.entry}'`,
            current: 1,
            pages: 1,
            perPage: 1
          }]
        })
      } else{
        response.render('results.ejs', {
          transcripts: transcriptsList,
          current: page,
          pages: Math.ceil(count / perPage),
          perPage: perPage
        })
      }
    })
  })



  // .then((transcriptsList) => {
  //   if(transcriptsList.length === 0){
  //     response.render('results.ejs', {transcripts: [{
  //       timestamp: "0-0",
  //       entry: `No results found for '${request.body.entry}'`
  //     }]})
  //   } else{
  //     response.render('results.ejs', {transcripts: transcriptsList})
  //   }
  // })
  // .catch((err) => {
  //   console.log(err)
  //   return 'error occurred'
  // })
})

app.get("/search/entry/allUnordered", async (request, response) => {
  // This setup is for regex search of any ENTRY field containing all of the
  // words (except allows any order)
  const queryString = String(request.body.entry).toLowerCase()
  let splitQuery = queryString.split(" ")
  let allQueries = []
  splitQuery.forEach(element => {
    allQueries.push({"entry": {$regex: String(element)}})
  })
  return Transcript.find({$and: allQueries})
  .exec()
  .then((transcriptsList) => {
    if(transcriptsList.length === 0){
      response.render('results.ejs', {transcripts: [{
        timestamp: "0-0",
        entry: `No results found for '${request.body.entry}'`
      }]})
    } else{
      response.render('results.ejs', {transcripts: transcriptsList})
    }
  })
  .catch((err) => {
    console.log(err)
    response.status(500).send(err)
  })
})

app.get("/search/timestamp/byCourseNumber", async (request, response) => {
  // This setup is for regex search of any TIMESTAMP related to a course number (1-41 currently)
  const courseNumber = request.body.courseNum
  return Transcript.find({timestamp: new RegExp("^" + courseNumber + "-")})
  .exec()
  .then((transcript) => {
    response.render('results.ejs', {transcripts: transcript})
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
